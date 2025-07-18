// src/main.jsx

import * as atatus from 'atatus-spa';
atatus.config('25de2f8822144301983e8129314ac423').install();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ✅ Register the service worker after rendering
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then((registration) => {
      console.log('✅ Service Worker registered:', registration);
    })
    .catch((error) => {
      console.error('❌ Service Worker registration failed:', error);
    });
}