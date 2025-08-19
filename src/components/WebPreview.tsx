import React from 'react';
import { Globe, RefreshCw } from 'lucide-react';

interface WebPreviewProps {
  content: string;
}

export const WebPreview: React.FC<WebPreviewProps> = ({ content }) => {
  const isEmpty = !content.trim();

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-300">Web Preview</h3>
        </div>
        
        {!isEmpty && (
          <button className="p-1 hover:bg-gray-700 rounded transition-colors duration-200">
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Preview Content */}
      <div className="flex-1 bg-white">
        {isEmpty ? (
          <div className="h-full flex items-center justify-center text-gray-500 bg-gray-900">
            <div className="text-center">
              <Globe className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No preview available</p>
              <p className="text-xs">Click "Preview" to see your webpage</p>
            </div>
          </div>
        ) : (
          <iframe
            srcDoc={content}
            title="Web Preview"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </div>
    </div>
  );
};