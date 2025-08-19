import React, { useRef } from 'react';
import { Upload, Plus } from 'lucide-react';
import { FileItem, FileType } from '../types';

interface FileUploaderProps {
  onFileUpload: (files: FileItem[]) => void;
}

const getFileType = (filename: string): FileType => {
  const extension = filename.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'html':
    case 'htm':
      return 'html';
    case 'css':
      return 'css';
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'json':
      return 'json';
    case 'md':
    case 'markdown':
      return 'markdown';
    default:
      return 'html'; // Default fallback
  }
};

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const filePromises = Array.from(selectedFiles).map((file) => {
      return new Promise<FileItem>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          resolve({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            content: content || '',
            type: getFileType(file.name)
          });
        };
        reader.readAsText(file);
      });
    });

    Promise.all(filePromises).then((files) => {
      onFileUpload(files);
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 border-b border-gray-700">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".html,.htm,.css,.js,.jsx,.json,.md,.markdown"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <button
        onClick={handleUploadClick}
        className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
      >
        <Upload className="w-4 h-4" />
        <span className="text-sm font-medium">Upload Files</span>
      </button>
      
      <div className="mt-2 text-xs text-gray-400 text-center">
        Supports HTML, CSS, JS, JSON, Markdown
      </div>
    </div>
  );
};