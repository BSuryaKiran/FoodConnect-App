// Import React library for creating components
import React from 'react';
// Import ReactDOM for rendering React components to the DOM
import ReactDOM from 'react-dom/client';
// Import global CSS styles
import './index.css';
// Import the main App component
import App from './App.jsx';

// Create a root element to render the React app - connects to div with id='root' in HTML
const root = ReactDOM.createRoot(document.getElementById('root'));
// Render the App component inside React.StrictMode (helps catch potential problems during development)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
