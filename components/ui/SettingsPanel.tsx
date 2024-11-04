import React from 'react';
import { Settings, Terminal, Trash2 } from 'lucide-react';

interface SettingsPanelProps {
  config: {
    style: string;
    showLineNumbers: boolean;
    removeComments: boolean;
    topFilesLength: number;
  };
  onConfigChange: (key: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, value: any) => void;
}

export function SettingsPanel({ config, onConfigChange }: SettingsPanelProps) {
  return (
    <div className="card bg-accent/50 backdrop-blur-sm shadow-xl">
      <div className="card-body">
        <div className="flex items-center mb-6">
          <Settings className="w-5 h-5 text-primary mr-2" />
          <h2 className="card-title text-neutral">Output Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral">Output Style</span>
              <select
                className="select select-primary w-[200px]"
                name='style'
                defaultValue={"plain"}
                onChange={(e) => onConfigChange(e, "output")}
              >
                <option value="markdown">Markdown</option>
                <option value="plain">Plain Text</option>
                <option value="xml">XML</option>
              </select>
            </label>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-neutral flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Show Line Numbers
              </span>
              <input
                type="checkbox"
                name='showLineNumbers'
                className="toggle toggle-primary"
                checked={config.showLineNumbers}
                onChange={(e) => onConfigChange(e, "output")}
              />
            </label>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-neutral flex items-center gap-2">
                <Trash2 className="w-5 h-5" />
                Remove Comments
              </span>
              <input
                type="checkbox"
                name="removeComments"
                className="toggle toggle-primary"
                checked={config.removeComments}
                onChange={(e) => onConfigChange(e, "output")}
              />
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral">Top Files Summary</span>
              <input
                type="number"
                className="input input-primary w-24"
                name="topFilesLength"
                value={config.topFilesLength}
                onChange={(e) => onConfigChange(e, "output")}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}