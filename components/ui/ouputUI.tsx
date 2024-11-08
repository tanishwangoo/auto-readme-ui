"use client";
import React, { useState } from 'react';
import { CodeBlock } from 'react-code-block'; // Keeping this as is
import { Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import CopyButton from '../../components/ui/CopytoClipbd';
interface BlockProps {
  content: { [key: string]: string }; // Object with key-value pairs
  style: string;
}

const ContentBlock: React.FC<BlockProps> = ({ content, style }) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  let [isOpen, setIsOpen] = useState(false)
  const handleDialogPopup = (key: string) => {
    setIsOpen(true);
    setSelectedPart(key);
  }
  const handleDialogClose = (key: string) => {
    setIsOpen(false);
    setSelectedPart(null);
  }
  return (
    <>
      {(selectedPart === null && !isOpen) ? (
        // Display the list of parts
        <div className="part-list">
          {Object.keys(content).map((key) => (
            <div key={key} className="flex flex-col">
              <button
                className="border border-neutral p-2 m-2"
                onClick={() => handleDialogPopup(key)}
              >
                {key}
              </button>
            </div>
          ))}
        </div>

      ) : (
        // Display the selected part's content
        <Dialog open={isOpen} onClose={() => handleDialogClose(`${selectedPart}`)} transition
          className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-in-out data-[closed]:opacity-0">
          <DialogBackdrop className="bg-base-100" />
          <div className="fixed inset-0 w-screen overflow-y-auto p-4">
            <div className="flex min-h-full items-center justify-center">
              <AnimatePresence>
                {(
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    key="dialog" // Ensure it has a unique key
                  >
                    {/* Dialog Panel */}
                    <DialogPanel
                      className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-base-100 border border-secondary shadow-xl rounded-lg"
                    >
                      <DialogTitle className="text-2xl font-bold mb-4">
                        <div className="flex flex-row items-center gap-2 justify-between">
                          <h1>{selectedPart}</h1>
                          <button
                            onClick={() => handleDialogClose(`${selectedPart}`)}
                            className="px-4 py-2 btn btn-secondary border ml-auto"
                          >
                            Close
                          </button>
                          <CopyButton code={content[`${selectedPart}`]}/>
                        </div>
                      </DialogTitle>
                      <div className="overflow-auto rounded-lg bg-gray-800 code-block-container open">
                        <CodeBlock code={content[`${selectedPart}`]} language={style}>
                          <CodeBlock.Code className="bg-accent p-6 rounded-xl shadow-lg">
                            <div className="table-row">
                              <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-neutral text-right select-none" />
                              <CodeBlock.LineContent className="table-cell text-neutral code-block-wrapper">
                                <CodeBlock.Token className="text-neutral" />
                              </CodeBlock.LineContent>
                            </div>
                          </CodeBlock.Code>
                        </CodeBlock>
                      </div>
                    </DialogPanel>
                  </motion.div>)}
              </AnimatePresence>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default ContentBlock;
