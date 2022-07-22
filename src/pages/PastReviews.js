import React, { useState, useEffect } from 'react';
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
import { collection, getDocs, query, where } from 'firebase/firestore'; 
import { db } from '../config/firebaseConfig';

var reviews = [];

export default function PastReviews() {
  const { user } = useAuth();
  const pfp = user.photoURL;
  // eslint-disable-next-line
  const [finish, setFinish] = useState(false);

  const getReviews = async () => {
    const reviewQuery = query(collection(db, "modreviews"), where("uid", "==", user.uid));

    const querySnapshot = await getDocs(reviewQuery);
    reviews = querySnapshot.docs.map(doc => doc.data());
  }

  useEffect(() => {
    getReviews().then(result => setFinish(true));
    // eslint-disable-next-line
  }, []);

  console.log(reviews);

  return(
    <div className="wrapper">
      <h2>Past Module Reviews</h2>
      <Grid container alignItems="top" spacing={2}>
        <Grid item xs={3}>
        <img src={pfp} alt="Avatar" referrerPolicy="no-referrer"/>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List component="nav" aria-label="main mailbox folders">
          <Link to='/profile' style={{ textDecoration: 'none', color: 'black' }}>
              <ListItemButton
                selected={false}
              >
                <ListItemIcon>
                  <PermIdentityIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </Link>
            <ListItemButton
              selected={true}
            >
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Past Reviews" />
            </ListItemButton>
          </List>
        </Box>

        </Grid>
        <Grid item xs={9}>
          <h3>Module reviews (to be replaced)</h3>
        </Grid>
      </Grid>
    </div>
  );
}