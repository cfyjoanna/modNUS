import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { Route, Routes, Link } from 'react-router-dom';

import './App.css';
import { useAuth } from './hooks/useAuth';
import Profile from './pages/Profile';
import Home from './pages/Home';
import TimetableGenerator from './pages/TimetableGenerator';
import Login from './pages/Login';

function App() {
  const { user } = useAuth();

  if(!user) {
    return <Login />
  }

  return (
    <div>
      <MenuAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="generator" element={<TimetableGenerator />} />
      </Routes>
    </div>
  );

  // entirety of below is for navbar
  function MenuAppBar() {
    const { user, signout } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorBurg, setAnchorBurg] = React.useState(null);
  
    const handleLogout = () => {
      handleClose();
      signout();
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleBurgClose = () => {
      setAnchorBurg(null)
    }

    const handleBurgMenu = (event) => {
      setAnchorBurg(event.currentTarget)
    }
  
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleBurgMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorBurg}
              anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorBurg)}
              onClose={handleBurgClose}
            >
                  
                  {/* Burger button dropdown here*/}
                  
              <Link to='/generator' style={{ textDecoration: 'none' }}>
                <MenuItem onClick={handleClose}>Timetable Generator</MenuItem>
              </Link>
            </Menu>


            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              modNUS
            </Typography>
            {user && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >

                  {/* Profile button dropdown here*/}
                  
                  <Link to='/profile' style={{ textDecoration: 'none' }}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default App;