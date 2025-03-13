// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure App.jsx is not wrapped in a <Router> here

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* No <Router> here */}
  </React.StrictMode>
);