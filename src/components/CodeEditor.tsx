import React from 'react';
import AceEditor from 'react-ace';
import { Play, Eye, Save } from 'lucide-react';
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
import 'ace-builds/src-noconflict/ext-language_tools';

interface CodeEditorProps {
  file: FileItem | undefined;
  onContentChange: (content: string) => void;
  onRunCode: () => void;
  onPreview: () => void;
}

const getModeFromType = (type: string): string => {
  switch (type) {
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'javascript':
      return 'javascript';
    case 'json':
      return 'json';
    case 'markdown':
      return 'markdown';
    default:
      return 'text';
  }
};

export const CodeEditor: React.FC<CodeEditorProps> = ({
  file,
  onContentChange,
  onRunCode,
  onPreview
}) => {
  if (!file) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-900">
        <div className="text-center text-gray-500">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">No File Selected</h3>
          <p>Select a file from the navigation panel to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-white">{file.name}</h2>
          <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded uppercase">
            {file.type}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onRunCode}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-medium">Run</span>
          </button>
          
          <button
            onClick={onPreview}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">Preview</span>
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200">
            <Save className="w-4 h-4" />
            <span className="text-sm font-medium">Save</span>
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1">
        <AceEditor
          mode={getModeFromType(file.type)}
          theme="tomorrow_night"
          value={file.content}
          onChange={onContentChange}
          name={`editor-${file.id}`}
          width="100%"
          height="100%"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
            useWorker: false
          }}
          editorProps={{
            $blockScrolling: true
          }}
        />
      </div>
    </div>
  );
};