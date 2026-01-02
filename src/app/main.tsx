import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'sonner'
import App from './App.tsx'
import '../styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" richColors />
  </React.StrictMode>,
)