"use client"
import { useState } from "react";
import { defaultConfig, ConfigJSON } from "@/components/ui/configJSON";
import { useRouter } from "next/navigation";
import DarkModeToggle from "@/components/ui/darkModeToggle";
// TODO : FIX that import JSONCMP from "@/components/ui/jsonviewer";
import { ValidateAndSend, SendInstruction, StartRepoJob } from "@/services/start-job-apis";

import AlertMessage from "@/components/ui/errr-cmp";
import { SiStryker } from "react-icons/si";

const Home: React.FC = () => {
  const [config, setConfig] = useState(defaultConfig);
  const [instructions, setInstructions] = useState<string>('');
  const [gitURL, setGitURL] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const [errrmsg, seterrmsg] = useState<string>('');
  const router = useRouter();
  const [isloading, setIsloading] = useState<boolean>(false);
  const validextns = new Set<string | undefined>(['md', 'txt', 'xml']);

  // Updated handleChange function
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: "output" | "ignore" | "security"
  ) => {
    const { name, value, type } = event.target;
    const updatedValue = type === "checkbox"
      ? (event.target as HTMLInputElement).checked
      : type === "number"
        ? parseInt(value, 10)
        : value;

    setConfig((prevConfig) => ({
      ...prevConfig,
      [section]: {
        ...prevConfig[section],
        [name]: updatedValue,
      },
    }));
  };


  let styleno = '.txt';
  switch (config.output.style) {
    case 'markdown':
      styleno = '.md'
      break;
    case 'plain':
      styleno = '.txt'
      break;
    case 'xml':
      styleno = '.xml'
      break;
  }
  const removeextension = (filename : string | undefined) =>{
    const parts = filename?.split('.');
    if (parts?.length) {
      const extension = parts?.pop(); // Get the extension (last part)
      const baseName = parts?.join('.'); // Join the remaining parts as the base name
      return { baseName, extension };
    } else {
      // If there's no dot, we assume no extension
      return { baseName: filename, extension: '' };
    }
  }

  // sends the instruction first and then the config file

  const addSearchParam = (key: string, value: string, key2: string, value2: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    params.set(key2, value2);
    return params.toString();
  };

  const PayloadProcess = async () => {
    setIsloading(true);
    console.log('Proceeding with:', gitURL);
    console.log(instructions);
    console.log(config);

    try { await SendInstruction(instructions); } catch (e) { console.error(e) }
    try { await ValidateAndSend(config); } catch (e) { console.error(e) }
    try { await StartRepoJob(gitURL); } catch (e) { console.error(e) }


  }

  const handleGenerate = async () => {
    if (!gitURL) {
      setShowError(true);
      seterrmsg('Invalid Repo Name');
    } 
    else if (!validextns.has(removeextension(config.output.filePath).extension)
    || removeextension(config.output.filePath).baseName == ''){
      setShowError(true);
      seterrmsg('Please add valid File Name');
    }
    else {
      await PayloadProcess();
      const params = addSearchParam("view", config.output.filePath, "style", config.output.style);
      router.push(`/view-context?${params}&instrfilepath=${encodeURIComponent(config.output.instructionFilePath)}`);
    }
  };
  const hideAlert = () => setShowError(false); // Callback to hide the alert


  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {/* <DarkModeToggle /> */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center text-center gap-4 p-6 bg-base-100">
        {showError && <AlertMessage hideAlert={hideAlert} text={errrmsg} />}

        {/* Loading overlay */}
        {isloading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-75 z-10">
            <div className="loader"></div>
          </div>
        )}

        <div className={`transition-all ${isloading ? 'blur-md opacity-50' : ''}`}>
          <div className="text-3xl text-neutral font-semibold  mb-6">Create READMEs automatically</div>

          <div className="form-control flex flex-col gap-4 items-center w-full max-w-lg">


            <div className="relative w-full">
              <input
                type="text"
                name="filePath"
                placeholder="Enter Output File Name"
                className="input input-bordered input-accent w-full pr-20"
                value={removeextension(config.output.filePath).baseName + styleno}
                onChange={(event) => handleChange(event, "output")}
              />
              <div className="badge badge-secondary absolute right-2 top-1/2 transform -translate-y-1/2">
                {styleno}
              </div>
            </div>
            <input
              type="text"
              name="EnterURL"
              required
              placeholder="Enter GitHub URL"
              className="input input-bordered input-accent w-full"
              onChange={(event) => setGitURL(event.target.value)}
            />

            <div className="flex flex-col gap-4 w-fit">
              <label className="label cursor-pointer flex justify-between">
                <span className="label-text font-medium">Style:</span>
                <select
                  name="style"
                  className="ml-5 select select-bordered w-full"
                  onChange={(event) => {
                    handleChange(event, "output");
                  }
                  }
                  defaultValue={"plain"}
                >
                  <option value="xml">XML</option>
                  <option value="plain">Plain</option>
                  <option value="markdown">Markdown</option>
                </select>
              </label>

              <label className="label cursor-pointer flex justify-between">
                <span className="label-text">Remove Comments</span>
                <input
                  type="checkbox"
                  name="removeComments"
                  className="checkbox checkbox-primary"
                  checked={config.output.removeComments}
                  onChange={(event) => handleChange(event, "output")}
                />
              </label>

              <label className="label cursor-pointer flex justify-between">
                <span className="label-text">Remove Empty Lines</span>
                <input
                  type="checkbox"
                  name="removeEmptyLines"
                  className="checkbox checkbox-primary"
                  checked={config.output.removeEmptyLines}
                  onChange={(event) => handleChange(event, "output")}
                />
              </label>

              <label className="label cursor-pointer flex justify-between">
                <span className="label-text">Top File Summary</span>
                <input
                  type="number"
                  name="topFilesLength"
                  className=" ml-5 input input-bordered w-24"
                  value={config.output.topFilesLength}
                  onChange={(event) => handleChange(event, "output")}
                />
              </label>

              <label className="label cursor-pointer flex justify-between">
                <span className="label-text">Show Line Numbers</span>
                <input
                  type="checkbox"
                  name="showLineNumbers"
                  className="checkbox checkbox-primary"
                  checked={config.output.showLineNumbers}
                  onChange={(event) => handleChange(event, "output")}
                />
              </label>
            </div>

            <textarea
              className="textarea textarea-bordered w-full mt-4"
              placeholder="Add Explicit Instructions"
              onChange={(e) => setInstructions(e.target.value)}
            ></textarea>

            <div className="bg-base-100 border rounded-lg p-4 mt-4 w-fit">
              <p className="text-left font-medium">JSON Payload:</p>
              <pre className="text-left">{JSON.stringify(config, null, 2)}</pre>
            </div>

            <button onClick={handleGenerate} className="btn btn-primary w-full mt-6">
              Generate Context!
            </button>
          </div>
        </div>
      </main>


    </div>
  );
};

export default Home;