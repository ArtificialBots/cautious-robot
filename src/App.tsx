import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CodeEditor } from './components/CodeEditor';
import { BottomPanel } from './components/BottomPanel';
import { FileItem } from './types';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([
    { 
      id: '1', 
      name: 'index.html', 
      content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to GTSMART</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            text-align: center;
            color: white;
            padding: 2rem;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            font-weight: 700;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        p {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 2rem;
        }
        .btn {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            padding: 12px 24px;
            border-radius: 50px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        .btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 GTSMART</h1>
        <p>Professional Code Editor</p>
        <button class="btn" onclick="alert('Welcome to GTSMART Code Editor!')">Get Started</button>
    </div>
</body>
</html>`, 
      type: 'html' 
    },
    { 
      id: '2', 
      name: 'styles.css', 
      content: `/* Modern CSS Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Variables */
:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --secondary: #8b5cf6;
  --accent: #06b6d4;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
}

/* Base Styles */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: var(--gray-900);
  background: var(--gray-50);
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

/* Cards */
.card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--gray-200);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}`, 
      type: 'css' 
    },
    { 
      id: '3', 
      name: 'app.js', 
      content: `// Modern JavaScript for GTSMART Code Editor
console.log('🚀 GTSMART Code Editor Loaded!');

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.updateThemeButton();
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    document.documentElement.setAttribute('data-theme', this.theme);
    this.updateThemeButton();
    console.log(\`Theme switched to: \${this.theme}\`);
  }

  updateThemeButton() {
    const btn = $('#theme-toggle');
    if (btn) {
      btn.textContent = this.theme === 'light' ? '🌙' : '☀️';
    }
  }
}

// Code Editor Utilities
class CodeUtils {
  static formatCode(code, type) {
    // Basic code formatting
    switch (type) {
      case 'json':
        try {
          return JSON.stringify(JSON.parse(code), null, 2);
        } catch (e) {
          return code;
        }
      default:
        return code;
    }
  }

  static validateCode(code, type) {
    switch (type) {
      case 'json':
        try {
          JSON.parse(code);
          return { valid: true, message: 'Valid JSON' };
        } catch (e) {
          return { valid: false, message: e.message };
        }
      case 'javascript':
        // Basic syntax check (simplified)
        try {
          new Function(code);
          return { valid: true, message: 'Valid JavaScript' };
        } catch (e) {
          return { valid: false, message: e.message };
        }
      default:
        return { valid: true, message: 'No validation available' };
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const themeManager = new ThemeManager();
  
  // Add theme toggle functionality
  const themeBtn = $('#theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => themeManager.toggle());
  }

  console.log('✅ GTSMART Code Editor initialized successfully!');
});

// Export for use in other modules
window.GTSMART = {
  ThemeManager,
  CodeUtils,
  version: '2.0.0'
};`, 
      type: 'javascript' 
    }
  ]);
  
  const [activeFileId, setActiveFileId] = useState<string>('1');
  const [output, setOutput] = useState<string>('');
  const [previewContent, setPreviewContent] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [bottomPanelHeight, setBottomPanelHeight] = useState<number>(320);

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
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        let capturedOutput = '';
        
        const captureLog = (...args: any[]) => {
          capturedOutput += '📝 ' + args.join(' ') + '\n';
          originalLog(...args);
        };
        
        const captureError = (...args: any[]) => {
          capturedOutput += '❌ ' + args.join(' ') + '\n';
          originalError(...args);
        };
        
        const captureWarn = (...args: any[]) => {
          capturedOutput += '⚠️ ' + args.join(' ') + '\n';
          originalWarn(...args);
        };

        console.log = captureLog;
        console.error = captureError;
        console.warn = captureWarn;

        eval(activeFile.content);
        
        console.log = originalLog;
        console.error = originalError;
        console.warn = originalWarn;
        
        setOutput(capturedOutput || '✅ Code executed successfully (no console output)');
      } catch (error) {
        setOutput(`❌ Runtime Error: ${error}`);
      }
    } else {
      setOutput(`ℹ️ Cannot execute ${activeFile.type.toUpperCase()} files directly. Use preview instead.`);
    }
  }, [activeFile]);

  const handlePreview = useCallback(() => {
    const htmlFile = files.find(f => f.type === 'html');
    const cssFile = files.find(f => f.type === 'css');
    const jsFile = files.find(f => f.type === 'javascript');

    if (!htmlFile) {
      setOutput('❌ No HTML file found for preview');
      return;
    }

    let htmlContent = htmlFile.content;

    if (cssFile) {
      const cssTag = `<style>${cssFile.content}</style>`;
      htmlContent = htmlContent.replace('</head>', `${cssTag}\n</head>`);
    }

    if (jsFile) {
      const jsTag = `<script>${jsFile.content}</script>`;
      htmlContent = htmlContent.replace('</body>', `${jsTag}\n</body>`);
    }

    setPreviewContent(htmlContent);
    setOutput('✅ Preview generated successfully');
  }, [files]);

  const handleDeleteFile = useCallback((fileId: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    if (activeFileId === fileId) {
      const remainingFiles = files.filter(file => file.id !== fileId);
      setActiveFileId(remainingFiles.length > 0 ? remainingFiles[0].id : '');
    }
  }, [activeFileId, files]);

  const handleCreateFile = useCallback((name: string, type: FileItem['type']) => {
    const newFile: FileItem = {
      id: Date.now().toString(),
      name,
      content: '',
      type
    };
    setFiles(prevFiles => [...prevFiles, newFile]);
    setActiveFileId(newFile.id);
  }, []);

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          files={files}
          activeFileId={activeFileId}
          onFileSelect={setActiveFileId}
          onFileDelete={handleDeleteFile}
          onFileUpload={handleFileUpload}
          onCreateFile={handleCreateFile}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              file={activeFile}
              onContentChange={handleFileContentChange}
              onRunCode={handleRunCode}
              onPreview={handlePreview}
            />
          </div>

          <BottomPanel
            output={output}
            previewContent={previewContent}
            height={bottomPanelHeight}
            onHeightChange={setBottomPanelHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default App;