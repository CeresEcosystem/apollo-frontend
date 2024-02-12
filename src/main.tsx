import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import PolkadotProvider from '@context/polkadot_context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PolkadotProvider>
      <App />
    </PolkadotProvider>
  </React.StrictMode>,
);
