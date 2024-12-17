import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// React 18 이후로는 createRoot 사용
const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
