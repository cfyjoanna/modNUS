import React from 'react';
import { useAuth } from '../../hooks/useAuth';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ArticleIcon from '@mui/icons-material/Article';

import { Link } from 'react-router-dom';

export default function ProfileSideBar( { select }) {
  const { user } = useAuth();
  const pfp = user.photoURL;

  return(
    <>
      <img src={pfp} alt="Avatar" referrerPolicy="no-referrer"/>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List component="nav" aria-label="main mailbox folders">
          <Link to='/profile' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItemButton
              selected={select[0]}
            >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </Link>
          <Link to='/pastreviews' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItemButton
              selected={select[1]}
            >
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Past Reviews" />
            </ListItemButton>
          </Link>
        </List>
      </Box>
    </>
  )
}