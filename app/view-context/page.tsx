"use client"
import { useState } from "react";
import ContentBlock from "@/components/ui/ouputUI";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getContextFile } from "@/services/getTextAPI";
import CopyButton from '../../components/ui/CopytoClipbd'
import { useRouter } from "next/navigation";
import storage from "local-storage-fallback";
import { useCollapse } from 'react-collapsed';


const addSearchParam = (key: string, value: string, key2: string, value2: string) => {
    const params = new URLSearchParams(); // Start with an empty URLSearchParams object
    params.set(key, value);
    params.set(key2, value2);
    return params.toString();
};

export default function ViewContent() {
    const searchParams = useSearchParams();
    const [outputText, setOutputText] = useState<string>('');
    const [style, setStyle] = useState<string>('');
    const outputFileName = searchParams.get('view');
    const instrfilepath = searchParams.get('instrfilepath');
    const styleparam = searchParams.get('style');
    const router = useRouter();
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();


    useEffect(() => {
        const fetchData = async () => {
            const outputtext: string | undefined = await getContextFile(outputFileName);
            if (outputtext) {
                setOutputText(outputtext);
            }
            else {
                setOutputText('No Content Available');
            }
        };
        fetchData();
        if (styleparam) {
            setStyle(styleparam)
        }
    }, []);
    const handleroutechange = () => {
        const params = addSearchParam('filename', `${outputFileName}`, 'instrfilepath', `${instrfilepath}`);
        storage.setItem('cachedAIOutput', '');
        router.push(`/ai-output?${params}`);
    }


    return (
        <div className="min-h-screen flex flex-col gap-5  bg-base-100 p-6">
            {/* Main Content */}
            <h2 className="text-lg font-semibold text-neutral text-center mb-4">Here is your custom AI-generated context!</h2>

            <div className="flex flex-row gap-4 items-center justify-center">
                <CopyButton code={outputText} />
                <button onClick={handleroutechange} className="btn btn-accent">
                    Ask AI
                </button>
            </div>
            <ContentBlock content={outputText} style={style}/>
        </div>
    )
}

