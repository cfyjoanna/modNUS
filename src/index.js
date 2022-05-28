import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProvideAuth } from './hooks/useAuth';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </BrowserRouter>
  </React.StrictMode>
);