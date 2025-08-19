import React from 'react';
import { FileText, Trash2, FileCode, Palette, Zap as Lightning } from 'lucide-react';
import { FileItem } from '../types';

interface FileNavigationProps {
  files: FileItem[];
  activeFileId: string;
  onFileSelect: (fileId: string) => void;
  onFileDelete: (fileId: string) => void;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case 'html':
      return <FileCode className="w-4 h-4 text-orange-400" />;
    case 'css':
      return <Palette className="w-4 h-4 text-blue-400" />;
    case 'javascript':
      return <Lightning className="w-4 h-4 text-yellow-400" />;
    default:
      return <FileText className="w-4 h-4 text-gray-400" />;
  }
};

export const FileNavigation: React.FC<FileNavigationProps> = ({
  files,
  activeFileId,
  onFileSelect,
  onFileDelete
}) => {
  return (
    <div className="flex-1 p-4">
      <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
        Project Files
      </h3>
      
      <div className="space-y-1">
        {files.map((file) => (
          <div
            key={file.id}
            className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${
              activeFileId === file.id
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-700 text-gray-300'
            }`}
            onClick={() => onFileSelect(file.id)}
          >
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              {getFileIcon(file.type)}
              <span className="text-sm font-medium truncate">{file.name}</span>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFileDelete(file.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600 rounded transition-all duration-200"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      
      {files.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No files yet</p>
          <p className="text-xs">Upload files to get started</p>
        </div>
      )}
    </div>
  );
};