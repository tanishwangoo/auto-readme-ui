import React from 'react';
import { Github, FileCode } from 'lucide-react';

interface InputFormProps {
  gitURL: string;
  setGitURL: (url: string) => void;
  filePath: string | undefined;
  filecode: string
  setFilePath: (path: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  instructions: string;
  setInstructions: (instructions: string) => void;
}

export function InputForm({
  gitURL,
  setGitURL,
  filePath,
  filecode,
  setFilePath,
  instructions,
  setInstructions,
}: InputFormProps) {
  return (
    <div className="card bg-accent/50 backdrop-blur-sm shadow-xl">
      <div className="card-body space-y-6">
        <div>
          <label className="label">
            <span className="label-text text-neutral">Repository URL</span>
          </label>
          <div className="relative">
            <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral w-5 h-5" />
            <input
              type="text"
              name="Enter GitHubURL"
              className="input input-bordered input-primary w-full pl-10"
              placeholder="https://github.com/username/repo"
              value={gitURL}
              onChange={(e) => setGitURL(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text text-neutral">Output Filename</span>
          </label>
          <div className="relative">
            <FileCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral w-5 h-5" />
            <input
              type="text"
              name='filePath'
              className="input input-bordered input-primary w-full pl-10"
              defaultValue={filePath}
              onChange={(e) => setFilePath(e)}
            />
            <div className="badge badge-secondary absolute right-2 top-1/2 transform -translate-y-1/2">
                {filecode}
              </div>
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text text-neutral">Custom Instructions</span>
          </label>
          <textarea
            className="textarea textarea-primary w-full min-h-[120px]"
            placeholder="Add any specific instructions for generating your README..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}