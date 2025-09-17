import React from 'react'
import ReactDOM from 'react-dom/client'
import ace from 'ace-builds'
import App from './App.tsx'
import './index.css'

// Configure Ace Editor base path
ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)