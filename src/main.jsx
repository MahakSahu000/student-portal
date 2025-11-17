import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from './components/ui/ToastProvider.jsx'

// Default to dark theme by adding the class to <html>
(function ensureDark() {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.classList.add('dark');
    const accent = localStorage.getItem('ui:accent') || 'accent-blue';
    root.classList.add(accent);
  }
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
)
