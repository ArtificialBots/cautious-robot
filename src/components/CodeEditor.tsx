import React, { useState } from 'react';
import AceEditor from 'react-ace';
import { 
  Play, 
  Eye, 
  Save, 
  Copy, 
  RotateCcw, 
  Maximize2, 
  Settings,
  FileText,
  Zap
} from 'lucide-react';
import { FileItem } from '../types';

// Import Ace editor modes and themes
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/theme-one_dark';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';

interface CodeEditorProps {
  file: FileItem | undefined;
  onContentChange: (content: string) => void;
  onRunCode: () => void;
  onPreview: () => void;
}

const getModeFromType = (type: string): string => {
  switch (type) {
    case 'html': return 'html';
    case 'css': return 'css';
    case 'javascript': return 'javascript';
    case 'json': return 'json';
    case 'markdown': return 'markdown';
    default: return 'text';
  }
};

const themes = [
  { value: 'github', label: 'Light' },
  { value: 'monokai', label: 'Monokai' },
  { value: 'tomorrow_night', label: 'Tomorrow Night' },
  { value: 'one_dark', label: 'One Dark' },
  { value: 'dracula', label: 'Dracula' }
];

export const CodeEditor: React.FC<CodeEditorProps> = ({
  file,
  onContentChange,
  onRunCode,
  onPreview
}) => {
  const [theme, setTheme] = useState('github');
  const [fontSize, setFontSize] = useState(14);
  const [showSettings, setShowSettings] = useState(false);

  const handleCopyCode = () => {
    if (file?.content) {
      navigator.clipboard.writeText(file.content);
    }
  };

  const handleSaveFile = () => {
    if (file) {
      const blob = new Blob([file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (!file) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-slate-200 rounded-2xl flex items-center justify-center mb-6">
            <FileText className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No File Selected</h3>
          <p className="text-slate-600 max-w-sm">
            Choose a file from the sidebar to start editing, or create a new file to begin coding.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              {file.type === 'html' && <FileText className="w-4 h-4 text-white" />}
              {file.type === 'css' && <FileText className="w-4 h-4 text-white" />}
              {file.type === 'javascript' && <Zap className="w-4 h-4 text-white" />}
              {!['html', 'css', 'javascript'].includes(file.type) && <FileText className="w-4 h-4 text-white" />}
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">{file.name}</h2>
              <p className="text-xs text-slate-500 uppercase tracking-wide">{file.type}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyCode}
            className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors text-sm"
          >
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </button>

          <button
            onClick={handleSaveFile}
            className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors text-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>

          <div className="w-px h-6 bg-slate-300"></div>

          <button
            onClick={onRunCode}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Play className="w-4 h-4" />
            <span>Run</span>
          </button>
          
          <button
            onClick={onPreview}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>

            {showSettings && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                <div className="p-4">
                  <h4 className="font-medium text-slate-900 mb-3">Editor Settings</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Theme</label>
                      <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {themes.map(t => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Font Size</label>
                      <input
                        type="range"
                        min="12"
                        max="20"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="text-xs text-slate-500 mt-1">{fontSize}px</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 relative">
        <AceEditor
          mode={getModeFromType(file.type)}
          theme={theme}
          value={file.content}
          onChange={onContentChange}
          name={`editor-${file.id}`}
          width="100%"
          height="100%"
          fontSize={fontSize}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
            useWorker: false,
            fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace'
          }}
          editorProps={{
            $blockScrolling: true
          }}
        />
      </div>
    </div>
  );
};