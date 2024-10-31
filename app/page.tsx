"use client"
import { useState } from "react";
import { defaultConfig, ConfigJSON } from "@/components/ui/configJSON";
import { useRouter } from "next/navigation";

// TODO : FIX that import JSONCMP from "@/components/ui/jsonviewer";
import { ValidateAndSend, SendInstruction, StartRepoJob } from "@/services/start-job-apis";

import AlertMessage from "@/components/ui/errr-cmp";

const Home: React.FC = () => {
  const [config, setConfig] = useState(defaultConfig);
  const [instructions, setInstructions] = useState<string>('');
  const [gitURL, setGitURL] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  const [isloading, setIsloading] = useState<boolean>(false)
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
  // sends the instruction first and then the config file
  
  const addSearchParam = (key:string, value:string, key2 :string, value2: string) => {
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
    } else {
      await PayloadProcess();
      const params = addSearchParam("view", config.output.filePath, "style", config.output.style);
      router.push(`/view-context?${params}&instrfilepath=${encodeURIComponent(config.output.instructionFilePath)}`);
    }
  };
  const hideAlert = () => setShowError(false); // Callback to hide the alert


  return (
    <div className="relative flex flex-col items-center text-center gap-4">
      {showError && <AlertMessage hideAlert={hideAlert} text="Please enter a valid GitHub URL" />}
      {/* Loading overlay */}
      {isloading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-75 z-10">
          <div className="loader"></div>
        </div>
      )}

      {/* Blurred main content when loading */}
      <div className={`transition-all ${isloading ? 'blur-md opacity-50' : ''}`}>
        <h1 className="text-secondary text-2xl font-bold">Auto README</h1>

        <div className="form-control flex flex-row gap-4 items-center w-full max-w-md">
          <input
            type="text"
            name="filePath"
            placeholder="Enter Output File Name"
            className="input input-bordered input-accent w-full max-w-xs"
            value={config.output.filePath}
            onChange={(event) => handleChange(event, "output")}
          />

          <input
            type="text"
            name="EnterURL"
            required
            placeholder="Enter GitHub URL"
            className="input input-bordered input-accent w-full max-w-xs"
            onChange={(event) => setGitURL(event.target.value)}
          />


          <label className="flex flex-col items-start">
            <span className="label-text font-semibold">Style:</span>
            <select
              name="style"
              className="select select-bordered w-full max-w-xs"
              value={config.output.style}
              onChange={(event) => handleChange(event, "output")}
            >
              <option value="xml">XML</option>
              <option value="plain">Plain</option>
              <option value="markdown">Markdown</option>
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-2 w-full max-w-md">
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

          <label className="label cursor-pointer flex justify-between items-center">
            <span className="label-text">Top File Summary</span>
            <input
              type="number"
              name="topFilesLength"
              className="input input-bordered w-24"
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

          <textarea
            className="textarea textarea-bordered"
            placeholder="Add Explicit Instructions"
            onChange={(e) => setInstructions(e.target.value)}
          ></textarea>

          <pre>{JSON.stringify(config, null, 2)}</pre>
          <button onClick={handleGenerate} className="btn btn-primary w-full mt-4">
            Generate Context!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;