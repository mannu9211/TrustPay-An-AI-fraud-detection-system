// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Error overlay helper: show runtime errors in-page for easier debugging
function showErrorOverlay(message, stack) {
  try {
    const existing = document.getElementById('runtime-error-overlay');
    if (existing) existing.remove();
    const overlay = document.createElement('div');
    overlay.id = 'runtime-error-overlay';
    overlay.style.position = 'fixed';
    overlay.style.zIndex = 100000;
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.right = '0';
    overlay.style.bottom = '0';
    overlay.style.background = 'rgba(0,0,0,0.85)';
    overlay.style.color = '#fff';
    overlay.style.padding = '24px';
    overlay.style.overflow = 'auto';
    overlay.style.fontFamily = 'monospace';
    overlay.innerHTML = `<h2 style="margin-top:0;">Runtime Error</h2><pre style="white-space:pre-wrap;">${String(message)}\n\n${String(stack||'')}</pre>`;
    document.body.appendChild(overlay);
  } catch (e) {
    // fallback to console
    console.error('Failed to show overlay', e);
  }
}

window.addEventListener('error', (ev) => {
  try {
    showErrorOverlay(ev.message, ev.error && ev.error.stack ? ev.error.stack : ev.filename + ':' + ev.lineno + ':' + ev.colno);
  } catch (e) {
    console.error(e);
  }
});

window.addEventListener('unhandledrejection', (ev) => {
  try {
    const reason = ev.reason && (ev.reason.stack || ev.reason.message) ? (ev.reason.stack || ev.reason.message) : String(ev.reason);
    showErrorOverlay('Unhandled Promise Rejection', reason);
  } catch (e) {
    console.error(e);
  }
});

const rootEl = document.getElementById('root');
if (!rootEl) {
  const msg = document.createElement('div');
  msg.style.padding = '20px';
  msg.style.background = '#111827';
  msg.style.color = '#fff';
  msg.innerText = 'Error: #root element not found. Check index.html.';
  document.body.appendChild(msg);
} else {
  try {
    ReactDOM.createRoot(rootEl).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    showErrorOverlay(err.message, err.stack);
    // also log
    console.error(err);
  }
}