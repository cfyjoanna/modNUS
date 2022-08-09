import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Grid } from '@mui/material';

import ProfileSideBar from './components/ProfileSideBar';

export default function Profile() {
  const { user } = useAuth();
  const username = user.displayName;

  return(
    <div className="wrapper">
      <h2>Profile</h2>
      <Grid container alignItems="top" spacing={2}>
        <Grid item xs={3}>
        <ProfileSideBar select={[true, false]}/>

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