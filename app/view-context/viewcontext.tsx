"use client"
import { useState } from "react";
import ContentBlock from "@/components/ui/ouputUI";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getContextFile } from "@/services/getTextAPI";

import { useRouter } from "next/navigation";
import storage from "local-storage-fallback";
import { useCollapse } from 'react-collapsed';
import { Outdent } from "lucide-react";


const addSearchParam = (key: string, value: string, key2: string, value2: string) => {
    const params = new URLSearchParams(); // Start with an empty URLSearchParams object
    params.set(key, value);
    params.set(key2, value2);
    return params.toString();
};

export default function ViewContent() {
    const searchParams = useSearchParams();
    const [outputjson, setOutputJson] = useState<{ [key: string]: string }>();
    const [style, setStyle] = useState<string>('');
    const [fulltxt, setFulltxt] = useState<string>('');
    const [tokencnt, setTokencnt] = useState<number | null>(null);
    const outputFileName = searchParams.get('view');
    const instrfilepath = searchParams.get('instrfilepath');
    const styleparam = searchParams.get('style');
    const router = useRouter();
    const [isloading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            let tempfulltxt='';
            const outputtext: { [key: string]: string } = await getContextFile(outputFileName);
            if (outputtext) {
                Object.values(outputtext).forEach((el)=>{
                    tempfulltxt += el;
                })
                setFulltxt(tempfulltxt);
                const partsJSON = Object.fromEntries(
                    Object.entries(outputtext).filter(([key]) => key !== 'Token Count')
                ); // parsing only Parts entry

                setTokencnt(parseInt(outputtext['Token Count']))
                setOutputJson(partsJSON);
            }
            else {
                setOutputJson({ 'Error': 'No Context Available' });
            }
        };
        fetchData();
        if (styleparam) {
            setStyle(styleparam)
        }
    }, []);
    
    const downloadTXT= () => {
        const blob = new Blob([fulltxt], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = (outputFileName) ? outputFileName : 'RepoAnalysis.txt'; // Default to 'README.md' if filename is not provided
        link.click();
        URL.revokeObjectURL(url); // Clean up the URL after downloading
    };
    const handleroutechange = () => {
        const params = addSearchParam('filename', `${outputFileName}`, 'instrfilepath', `${instrfilepath}`);
        storage.setItem('cachedAIOutput', '');
        setIsLoading(true);
        router.push(`/ai-output?${params}`);
    }


    return (
        <div className="min-h-screen flex flex-col gap-5  bg-base-100 p-6">

            {/* Loading overlay */}
            {isloading && (
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-75 z-10">
                    <div className="loader"></div>
                </div>
            )}



            <h2 className="text-lg font-semibold text-neutral text-center mb-4">Here is your custom AI-generated context!</h2>
            <div className="flex flex-row gap-4 items-center justify-center">
                {/* <CopyButton code={outputjson} /> */}
                <button onClick={handleroutechange} className="btn btn-primary">
                    Ask AI
                </button>
                <button className="btn btn-accent" onClick={downloadTXT}>Download full file</button>
            </div>
            {(outputjson != undefined) ? <ContentBlock content={outputjson} style={style} /> : <></> /* conditionally render */}
            
            {/* Token Count popup */}
            <div className="flex flex-col items-center">
                <div className="badge bg-warning border border-warning text-accent border border-yellow-400 p-2 rounded-md shadow-md">
                    <span className="font-semibold">Total Token Count is&nbsp;</span>
                    <span className="text-secondary font-bold">{tokencnt}</span>.
                    Codebase is spread across&nbsp;
                    <span className="text-secondary font-bold">{outputjson && Object.keys(outputjson).length}&nbsp;</span> parts.
                </div>
            </div>
        </div>
    )
}

