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

import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import './App.css';
import AddModReview from './pages/AddModReview';
import Home from './pages/Home';
import Login from './pages/Login';
import Planner from './pages/Planner';
import PastReviews from './pages/PastReviews';
import Profile from './pages/Profile';
import Reviews from './pages/Reviews';
import TimetableGenerator from './pages/timetable/TimetableGenerator';
import ReviewSubmitted from './pages/ReviewSubmitted';
import ErrorPage from './pages/ErrorPage';
import EditReview from './pages/EditReview';

import { Oval } from 'react-loading-icons'

function App() {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1700);
  }, [])
  
  return (
    <>
      {loading === false ? (
        <>
          { !user ? <Login /> :
            <div>
              <MenuAppBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route path="pastreviews" element={<PastReviews />} />
                <Route path="generator" element={<TimetableGenerator />} />
                <Route path="planner" element={<Planner />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="addmodreview" element={<AddModReview />} />
                <Route path="reviewsubmitted" element={<ReviewSubmitted />} />
                <Route path="errorpage" element={<ErrorPage />} />
                <Route path="editreview/:docId" element={<EditReview />} />
              </Routes>
            </div>}
        </>
      ) : (
        <div className="center-wrapper">
          <Oval stroke="#06bcee"/>
        </div>
      )}
    </>
  );

  // entirety of below is for navbar
  function MenuAppBar() {
    const { user, signout } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorBurg, setAnchorBurg] = React.useState(null);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      handleClose();
      signout();
      navigate('./');
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
                  
              <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                <MenuItem onClick={handleBurgClose}>Home</MenuItem>
              </Link>
              <Link to='/generator' style={{ textDecoration: 'none', color: 'black' }}>
                <MenuItem onClick={handleBurgClose}>Timetable Generator</MenuItem>
              </Link>
              <Link to='/planner' style={{ textDecoration: 'none', color: 'black' }}>
                <MenuItem onClick={handleBurgClose}>Planner</MenuItem>
              </Link>
              <Link to='/reviews' style={{ textDecoration: 'none', color: 'black' }}>
                <MenuItem onClick={handleBurgClose}>Reviews</MenuItem>
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
                  
                  <Link to='/profile' style={{ textDecoration: 'none', color: 'black' }}>
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