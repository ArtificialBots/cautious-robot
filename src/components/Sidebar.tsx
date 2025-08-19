import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Upload, 
  FileText, 
  FileCode, 
  Palette, 
  Zap,
  Trash2,
  FolderOpen,
  Search
} from 'lucide-react';
import { FileItem } from '../types';

interface SidebarProps {
  files: FileItem[];
  activeFileId: string;
  onFileSelect: (fileId: string) => void;
  onFileDelete: (fileId: string) => void;
  onFileUpload: (files: FileItem[]) => void;
  onCreateFile: (name: string, type: FileItem['type']) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case 'html':
      return <FileCode className="w-4 h-4 text-orange-500" />;
    case 'css':
      return <Palette className="w-4 h-4 text-blue-500" />;
    case 'javascript':
      return <Zap className="w-4 h-4 text-yellow-500" />;
    case 'json':
      return <FileText className="w-4 h-4 text-green-500" />;
    case 'markdown':
      return <FileText className="w-4 h-4 text-purple-500" />;
    default:
      return <FileText className="w-4 h-4 text-slate-500" />;
  }
};

const getFileType = (filename: string): FileItem['type'] => {
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
      return 'html';
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  files,
  activeFileId,
  onFileSelect,
  onFileDelete,
  onFileUpload,
  onCreateFile,
  collapsed,
  onToggleCollapse
}) => {
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    Promise.all(filePromises).then((uploadedFiles) => {
      onFileUpload(uploadedFiles);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    });
  };

  const handleCreateFile = (type: FileItem['type']) => {
    const extensions = {
      html: '.html',
      css: '.css',
      javascript: '.js',
      json: '.json',
      markdown: '.md'
    };
    
    const name = `new-file${extensions[type]}`;
    onCreateFile(name, type);
    setShowCreateMenu(false);
  };

  if (collapsed) {
    return (
      <div className="w-12 bg-white border-r border-slate-200 flex flex-col items-center py-4">
        <button
          onClick={onToggleCollapse}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors mb-4"
        >
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </button>
        <div className="flex flex-col space-y-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <FolderOpen className="w-4 h-4 text-slate-600" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Search className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FolderOpen className="w-4 h-4 text-slate-600" />
            <h3 className="font-semibold text-slate-900">Explorer</h3>
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium flex-1"
            >
              <Plus className="w-4 h-4" />
              <span>New</span>
            </button>
            
            {showCreateMenu && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                <div className="p-2">
                  <button
                    onClick={() => handleCreateFile('html')}
                    className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-slate-50 rounded text-sm"
                  >
                    <FileCode className="w-4 h-4 text-orange-500" />
                    <span>HTML File</span>
                  </button>
                  <button
                    onClick={() => handleCreateFile('css')}
                    className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-slate-50 rounded text-sm"
                  >
                    <Palette className="w-4 h-4 text-blue-500" />
                    <span>CSS File</span>
                  </button>
                  <button
                    onClick={() => handleCreateFile('javascript')}
                    className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-slate-50 rounded text-sm"
                  >
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>JavaScript File</span>
                  </button>
                  <button
                    onClick={() => handleCreateFile('json')}
                    className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-slate-50 rounded text-sm"
                  >
                    <FileText className="w-4 h-4 text-green-500" />
                    <span>JSON File</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".html,.htm,.css,.js,.jsx,.json,.md,.markdown"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-auto p-4">
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm font-medium mb-1">No files found</p>
            <p className="text-xs">Create or upload files to get started</p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeFileId === file.id
                    ? 'bg-indigo-50 border border-indigo-200 text-indigo-900'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
                onClick={() => onFileSelect(file.id)}
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {getFileIcon(file.type)}
                  <span className="text-sm font-medium truncate">{file.name}</span>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileDelete(file.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 hover:text-red-600 rounded transition-all duration-200"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};