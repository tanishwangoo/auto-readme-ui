"use client"
import { useState } from 'react';
import { CodeBlock } from 'react-code-block';

interface BlockProps {
    content: string;
    style: string;
    collapsedHeight?: number; // Height in pixels when collapsed
}

const ContentBlock: React.FC<BlockProps> = ({ content, style, collapsedHeight = 200 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);
    return (
        <div>
        <details className="collapse bg-neutral ">
            <summary className="collapse-title text-gray-900 text-xl font-medium">Click to Expand/Shorten</summary>
            <div className="collapse-content">
                <CodeBlock code={content} language={style}>
                    <CodeBlock.Code className="bg-gray-900 p-6 rounded-xl shadow-lg">
                        <div className="table-row">
                            <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-primary text-right select-none" />
                            <CodeBlock.LineContent className="table-cell text-primary">
                                <CodeBlock.Token className='text-secondary' />
                            </CodeBlock.LineContent>
                        </div>
                    </CodeBlock.Code>
                </CodeBlock>
            </div>
        </details>
        </div>
    )
}

export default ContentBlock;
