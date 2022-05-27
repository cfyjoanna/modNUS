import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { useAuth } from './hooks/useAuth';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Preferences from './pages/Preferences/Preferences';
import Login from './pages/Login';

function App() {
  const { user } = useAuth();

  return (
    <div>
      {user ? <Home /> : <Login />}
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="preferences" element={<Preferences />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;