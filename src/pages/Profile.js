import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Grid } from '@mui/material';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ArticleIcon from '@mui/icons-material/Article';

import { Link } from 'react-router-dom';

export default function Profile() {
  const { user } = useAuth();
  const pfp = user.photoURL;
  const username = user.displayName;

  return(
    <div className="wrapper">
      <h2>Profile</h2>
      <Grid container alignItems="top" spacing={2}>
        <Grid item xs={3}>
        <img src={pfp} alt="Avatar" referrerPolicy="no-referrer"/>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
              selected={true}
            >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <Link to='/pastreviews' style={{ textDecoration: 'none', color: 'black' }}>
              <ListItemButton
                selected={false}
              >
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Past Reviews" />
              </ListItemButton>
            </Link>
          </List>
        </Box>

        </Grid>
        <Grid item xs={9}>
          <h3>{username}</h3>
          <span style={{fontWeight: 'bold'}}>Email: </span>
          <span>{user.email}</span>
        </Grid>
      </Grid>
    </div>
  );
}