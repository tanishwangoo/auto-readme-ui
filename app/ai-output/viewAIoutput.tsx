"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MarkdownPreview from '@uiw/react-markdown-preview';
import CopyButton from "@/components/ui/CopytoClipbd";
import storage from "local-storage-fallback";

export default function ViewAIOutput() {
    const searchParams = useSearchParams();
    const outputFileName = searchParams.get('filename');
    const instrfilepath = searchParams.get('instrfilepath');
    const [responsedone, setResponseDone] = useState<boolean>(false);
    const [aioutput, setAIoutput] = useState(() => storage.getItem('cachedAIOutput') || '');
    const [isHydrated, setIsHydrated] = useState(false); // Flag to track hydration
    const DownloadBtnRef = useRef<HTMLButtonElement>(null);

    const BASE_AI_URL_UNSAFE = "http://68.183.148.243/ai";
    const BASE_AI_URL = "https://autoreadme-api.online/ai";

    const localhostURL = "http://localhost:5000/ai";
    const router = useRouter();
    const downloadMarkdown = () => {
        const blob = new Blob([aioutput], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `README.md`; // Default to 'README.md' if filename is not provided
        link.click();
        URL.revokeObjectURL(url); // Clean up the URL after downloading
    };
    useEffect(() => {
        setIsHydrated(true);
    }, []);
    useEffect(() => {
        // Only fetch if there's no cached output
        if (!aioutput) {
            const getAIOutput = async (filename : string, instrfilepath: string) => {
                try {
                    const response = await fetch(`${localhostURL}/askAI?filename=${encodeURIComponent(filename)}&instrfile=${encodeURIComponent(instrfilepath)}`, {
                        method: 'GET'
                    });

                    if (!response.ok || !response.body) {
                        throw new Error("Failed to fetch the stream.");
                    }
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder("utf-8");

                    let newOutput = '';
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) {
                            setResponseDone(true); // Set completion flag when done
                            break;
                        }

                        const chunk = decoder.decode(value, { stream: true });
                        newOutput += chunk;
                        setAIoutput((prev) => prev + chunk); // Update state with new data
                    }

                    storage.setItem('cachedAIOutput', newOutput); // Cache the complete output in local storage
                } catch (err) {
                    console.error(err);
                }
            };

            if (outputFileName && instrfilepath) {
                getAIOutput(outputFileName, instrfilepath);
            }
        } else {
            // Mark as complete if data is already cached
            setResponseDone(true);
        }
    }, [aioutput, outputFileName, instrfilepath]);

    useEffect(() => {
        if (responsedone && DownloadBtnRef.current) {
            DownloadBtnRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [responsedone]);

    return (
        <div className="mt-5 gap-5 flex flex-col justify-center items-center min-h-screen">
            {(responsedone) ?
                <div className="flex flex-row gap-2">
                    <CopyButton code={aioutput} />
                    <button ref={DownloadBtnRef} className="btn btn-primary" onClick={downloadMarkdown}>Download File</button>
                    <button onClick={() => router.push('/')} className="btn btn-neutral text">Go to Home</button>
                </div> : <></>
            }
            <div className="mockup-code bg-primary text-primary-content w-fit max-w-3xl h-auto overflow-hidden rounded-lg shadow-lg">
                    <code>
                        {/* Render MarkdownPreview only after hydration */}
                        {isHydrated && (
                            <MarkdownPreview source={aioutput} style={{ padding: 16 }} disableCopy={false} />
                        )}              
                    </code>
        </div>
        </div>
    );


}