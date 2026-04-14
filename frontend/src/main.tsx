import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { MemoProvider } from './context/MemoContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MemoProvider>
      <App />
    </MemoProvider>
  </React.StrictMode>
);
