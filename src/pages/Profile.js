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

import Tooltip from '@mui/material/Tooltip';

export default function Profile() {
  const { user } = useAuth();
  const pfp = user.photoURL;
  const username = user.displayName;

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return(
    <div className="wrapper">
      <h2>Profile</h2>
      <Grid container alignItems="top" spacing={2}>
        <Grid item xs={3}>
        <img src={pfp} alt="Avatar" referrerPolicy="no-referrer"/>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <Tooltip title="Not functional yet">
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Past Reviews" />
            </ListItemButton>
            </Tooltip>
          </List>
        </Box>

        </Grid>
        <Grid item xs={9}>
          <h3>{username}</h3>
        </Grid>
      </Grid>
    </div>
  );
}