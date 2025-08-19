import React from 'react';
import { Terminal, AlertCircle, CheckCircle } from 'lucide-react';

interface OutputDisplayProps {
  output: string;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => {
  const isError = output.toLowerCase().includes('error');
  const isEmpty = !output.trim();

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex items-center space-x-2 p-3 bg-gray-800 border-b border-gray-700">
        <Terminal className="w-4 h-4 text-gray-400" />
        <h3 className="text-sm font-semibold text-gray-300">Console Output</h3>
        {!isEmpty && (
          <div className="ml-auto">
            {isError ? (
              <AlertCircle className="w-4 h-4 text-red-400" />
            ) : (
              <CheckCircle className="w-4 h-4 text-green-400" />
            )}
          </div>
        )}
      </div>

      {/* Output Content */}
      <div className="flex-1 p-4 overflow-auto">
        {isEmpty ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Terminal className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No output yet</p>
              <p className="text-xs">Run your code to see results here</p>
            </div>
          </div>
        ) : (
          <pre className={`text-sm font-mono whitespace-pre-wrap ${
            isError ? 'text-red-400' : 'text-green-400'
          }`}>
            {output}
          </pre>
        )}
      </div>
    </div>
  );
};