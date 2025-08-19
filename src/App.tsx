import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileNavigation } from './components/FileNavigation';
import { CodeEditor } from './components/CodeEditor';
import { OutputDisplay } from './components/OutputDisplay';
import { FileUploader } from './components/FileUploader';
import { WebPreview } from './components/WebPreview';
import { FileItem } from './types';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([
    { 
      id: '1', 
      name: 'index.html', 
      content: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Hello World</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n    <p>Welcome to GTSMART Code Editor</p>\n</body>\n</html>', 
      type: 'html' 
    },
    { 
      id: '2', 
      name: 'style.css', 
      content: 'body {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 20px;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n}\n\nh1 {\n    text-align: center;\n    margin-bottom: 20px;\n}', 
      type: 'css' 
    },
    { 
      id: '3', 
      name: 'script.js', 
      content: 'console.log("Hello from GTSMART Code Editor!");\n\n// Add some interactivity\ndocument.addEventListener("DOMContentLoaded", function() {\n    const h1 = document.querySelector("h1");\n    if (h1) {\n        h1.addEventListener("click", function() {\n            alert("Hello! You clicked the heading!");\n        });\n    }\n});', 
      type: 'javascript' 
    }
  ]);
  
  const [activeFileId, setActiveFileId] = useState<string>('1');
  const [output, setOutput] = useState<string>('');
  const [previewContent, setPreviewContent] = useState<string>('');

  const activeFile = files.find(file => file.id === activeFileId);

  const handleFileContentChange = useCallback((content: string) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === activeFileId 
          ? { ...file, content } 
          : file
      )
    );
  }, [activeFileId]);

  const handleFileUpload = useCallback((uploadedFiles: FileItem[]) => {
    setFiles(prevFiles => [...prevFiles, ...uploadedFiles]);
  }, []);

  const handleRunCode = useCallback(() => {
    if (!activeFile) return;

    if (activeFile.type === 'javascript') {
      try {
        // Capture console.log output
        const originalLog = console.log;
        let capturedOutput = '';
        
        console.log = (...args) => {
          capturedOutput += args.join(' ') + '\n';
          originalLog(...args);
        };

        // Execute the code
        eval(activeFile.content);
        
        // Restore original console.log
        console.log = originalLog;
        
        setOutput(capturedOutput || 'Code executed successfully (no output)');
      } catch (error) {
        setOutput(`Error: ${error}`);
      }
    } else {
      setOutput(`Cannot execute ${activeFile.type} files directly. Use the preview feature instead.`);
    }
  }, [activeFile]);

  const handlePreview = useCallback(() => {
    const htmlFile = files.find(f => f.type === 'html');
    const cssFile = files.find(f => f.type === 'css');
    const jsFile = files.find(f => f.type === 'javascript');

    if (!htmlFile) {
      setOutput('No HTML file found for preview');
      return;
    }

    let htmlContent = htmlFile.content;

    // Inject CSS if available
    if (cssFile) {
      const cssTag = `<style>${cssFile.content}</style>`;
      htmlContent = htmlContent.replace('</head>', `${cssTag}\n</head>`);
    }

    // Inject JavaScript if available
    if (jsFile) {
      const jsTag = `<script>${jsFile.content}</script>`;
      htmlContent = htmlContent.replace('</body>', `${jsTag}\n</body>`);
    }

    setPreviewContent(htmlContent);
  }, [files]);

  const handleDeleteFile = useCallback((fileId: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    if (activeFileId === fileId) {
      const remainingFiles = files.filter(file => file.id !== fileId);
      setActiveFileId(remainingFiles.length > 0 ? remainingFiles[0].id : '');
    }
  }, [activeFileId, files]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar - File Navigation */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          <FileUploader onFileUpload={handleFileUpload} />
          <FileNavigation 
            files={files}
            activeFileId={activeFileId}
            onFileSelect={setActiveFileId}
            onFileDelete={handleDeleteFile}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Code Editor */}
          <div className="flex-1 flex">
            <div className="flex-1">
              <CodeEditor
                file={activeFile}
                onContentChange={handleFileContentChange}
                onRunCode={handleRunCode}
                onPreview={handlePreview}
              />
            </div>
          </div>

          {/* Bottom Panel - Output and Preview */}
          <div className="h-80 border-t border-gray-700 flex">
            <div className="flex-1 border-r border-gray-700">
              <OutputDisplay output={output} />
            </div>
            <div className="flex-1">
              <WebPreview content={previewContent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;