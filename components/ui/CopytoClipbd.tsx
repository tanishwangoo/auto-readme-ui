import { useState } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";

interface Props {
    code: string;
  }
  
  function CopyButton({ code }: Props) {
    const [isCopied, setIsCopied] = useState(false);
  
    const handleCopy = () => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    };
  
    return (
      <CopyToClipboard text={code} onCopy={handleCopy}>
        <button className="w-fixed btn-rounded-full btn btn-secondary">
          <div className="flex flex-row gap-1">
            <FaRegCopy />
            <p>{isCopied ? "Copied!" : "Copy To Clipboard"}</p>
          </div>
        </button>
      </CopyToClipboard>
    );
  }
  
  export default CopyButton;