import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Grid } from '@mui/material';

export default function Profile() {
  const { user } = useAuth();
  const pfp = user.photoURL;
  const username = user.displayName;

  return(
    <div className="wrapper">
      <h2>Profile</h2>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={3}>
        <img src={pfp} alt="Avatar" referrerPolicy="no-referrer"/>
        </Grid>
        <Grid item xs={9}>
          <h3>{username}</h3>
        </Grid>
      </Grid>
    </div>
  );
}