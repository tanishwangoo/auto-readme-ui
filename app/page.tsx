"use client"
import { useEffect, useState } from "react";
import { defaultConfig, ConfigJSON } from "@/components/ui/configJSON";
import { useRouter } from "next/navigation";
import DarkModeToggle from "@/components/ui/darkModeToggle";
// TODO : FIX that import JSONCMP from "@/components/ui/jsonviewer";
import { ValidateAndSend, SendInstruction, StartRepoJob } from "@/services/start-job-apis";

import AlertMessage from "@/components/ui/errr-cmp";
import { SiStryker } from "react-icons/si";
import { Hero } from "@/components/ui/Hero";
import { InputForm } from "@/components/ui/InputForm";
import { SettingsPanel } from "@/components/ui/SettingsPanel";

const Home: React.FC = () => {
  const [config, setConfig] = useState(defaultConfig);
  const [instructions, setInstructions] = useState<string>('');
  const [stylecode, setStylecode] = useState<string>('.txt');
  const [gitURL, setGitURL] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const [errrmsg, seterrmsg] = useState<string>('');
  const router = useRouter();
  const [isloading, setIsloading] = useState<boolean>(false);
  const validextns = new Set<string | undefined>(['md', 'txt', 'xml']);

  // Updated handleChange function
  const handleConfigChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: "output" | "ignore" | "security"
  ) => {
    const { name, value, type } = event.target;

    const updatedValue =
      type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : type === "number"
          ? parseInt(value, 10)
          : value;

    setConfig((prevConfig) => ({
      ...prevConfig,
      [section]: {
        ...prevConfig[section],
        [name]: name === "filePath" ? updatedValue + stylecode : updatedValue,
      },
    }));
  };
  
  const FilePathChange = (updatedValue : string | undefined) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      output: {
        ...prevConfig.output,
        filePath: updatedValue + stylecode
      }
    }));
  };

  useEffect(() =>{
    changestylecode();
    FilePathChange(removeextension(config.output.filePath).baseName);
  }, [config.output.style, stylecode])

  const changestylecode = ()=>{
    switch (config.output.style) {
      case 'markdown':
        setStylecode('.md');
        break;
      case 'plain':
        setStylecode('.txt');
        break;
      case 'xml':
        setStylecode('.xml');
        break;
    }
  }

  const removeextension = (filename: string | undefined) => {
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
      || removeextension(config.output.filePath).baseName == '') {
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

    <div className="min-h-screen bg-base-100">
      <div className="relative overflow-hidden">
        {isloading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-75 z-10">
            <div className="loader"></div>
          </div>
        )}

        <div className={`transition-all ${isloading ? 'blur-md opacity-50' : ''}`}>


          {showError && <AlertMessage hideAlert={hideAlert} text={errrmsg} />}

          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Hero />

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <InputForm
                gitURL={gitURL}
                setGitURL={setGitURL}
                filePath={removeextension(config.output.filePath).baseName}
                filecode={stylecode}
                setFilePath={(path) => handleConfigChange(path, "output")}
                instructions={instructions}
                setInstructions={setInstructions}
              />
              <SettingsPanel
                config={config.output}
                onConfigChange={handleConfigChange}
              />
            </div>
{/* 
            Json Payload for testing purposes
            <div className="items-center flex flex-col">
              <div className="bg-base-100 border rounded-lg p-4 mt-4 w-fit">
                <p className="text-left font-medium">JSON Payload:</p>
                <pre className="text-left">{JSON.stringify(config, null, 2)}</pre>
              </div>
            </div> */}
            <div className="mt-8 text-center">
              <button
                onClick={handleGenerate}
                className="btn btn-primary btn-lg gap-2 hover:scale-105 transition-transform"
              >
                Generate README
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

