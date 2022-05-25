import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="preferences" element={<Preferences />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
