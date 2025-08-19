import React from 'react';
import { Code2, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center px-6">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
          <Code2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">GTSMART Code Editor</h1>
          <p className="text-sm text-gray-400">Professional web development environment</p>
        </div>
      </div>
      
      <div className="ml-auto flex items-center space-x-2">
        <div className="flex items-center space-x-1 px-3 py-1 bg-green-600 rounded-full">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">Live</span>
        </div>
      </div>
    </header>
  );
};