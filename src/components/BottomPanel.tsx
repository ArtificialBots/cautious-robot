import React, { useState } from 'react';
import { 
  Terminal, 
  Globe, 
  ChevronUp, 
  ChevronDown, 
  Maximize2, 
  Minimize2,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface BottomPanelProps {
  output: string;
  previewContent: string;
  height: number;
  onHeightChange: (height: number) => void;
}

export const BottomPanel: React.FC<BottomPanelProps> = ({
  output,
  previewContent,
  height,
  onHeightChange
}) => {
  const [activeTab, setActiveTab] = useState<'output' | 'preview'>('output');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleResize = (e: React.MouseEvent) => {
    const startY = e.clientY;
    const startHeight = height;

    const handleMouseMove = (e: MouseEvent) => {
      const newHeight = startHeight - (e.clientY - startY);
      onHeightChange(Math.max(200, Math.min(600, newHeight)));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const getOutputIcon = () => {
    if (!output) return <Info className="w-4 h-4 text-slate-400" />;
    if (output.includes('❌')) return <AlertCircle className="w-4 h-4 text-red-500" />;
    if (output.includes('✅')) return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    return <Terminal className="w-4 h-4 text-slate-600" />;
  };

  if (isCollapsed) {
    return (
      <div className="h-12 bg-white border-t border-slate-200 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab('output')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'output' 
                ? 'bg-slate-100 text-slate-900' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {getOutputIcon()}
            <span>Console</span>
          </button>
          
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'preview' 
                ? 'bg-slate-100 text-slate-900' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Preview</span>
          </button>
        </div>

        <button
          onClick={() => setIsCollapsed(false)}
          className="p-1 hover:bg-slate-100 rounded transition-colors"
        >
          <ChevronUp className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border-t border-slate-200" style={{ height }}>
      {/* Resize Handle */}
      <div
        className="h-1 bg-slate-200 hover:bg-indigo-300 cursor-row-resize transition-colors"
        onMouseDown={handleResize}
      />

      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('output')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'output' 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {getOutputIcon()}
            <span>Console</span>
            {output && (
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'preview' 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Preview</span>
            {previewContent && (
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            )}
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {activeTab === 'preview' && previewContent && (
            <button className="p-1 hover:bg-slate-200 rounded transition-colors">
              <RefreshCw className="w-4 h-4 text-slate-600" />
            </button>
          )}
          
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 hover:bg-slate-200 rounded transition-colors"
          >
            <ChevronDown className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-hidden" style={{ height: height - 60 }}>
        {activeTab === 'output' ? (
          <div className="h-full p-4 overflow-auto bg-slate-50">
            {!output ? (
              <div className="h-full flex items-center justify-center text-slate-500">
                <div className="text-center">
                  <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="font-medium mb-1">Console Output</p>
                  <p className="text-sm">Run your code to see results here</p>
                </div>
              </div>
            ) : (
              <div className="font-mono text-sm">
                <pre className="whitespace-pre-wrap text-slate-800 leading-relaxed">
                  {output}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full bg-white">
            {!previewContent ? (
              <div className="h-full flex items-center justify-center text-slate-500 bg-slate-50">
                <div className="text-center">
                  <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="font-medium mb-1">Web Preview</p>
                  <p className="text-sm">Click "Preview" to see your webpage</p>
                </div>
              </div>
            ) : (
              <iframe
                srcDoc={previewContent}
                title="Web Preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};