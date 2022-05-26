import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProvideAuth } from './hooks/useAuth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </React.StrictMode>
);