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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Tooltip from '@mui/material/Tooltip';
import Rating from '@mui/material/Rating';
import LabelledRatingReadOnly from './components/LabelledRatingReadOnly.js';

import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore'; 
import { db } from '../config/firebaseConfig';

var reviewToDelete = "";

export default function PastReviews() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const pfp = user.photoURL;
  // eslint-disable-next-line
  const [finish, setFinish] = useState(false);
  const [reviews, setReviews] = useState([]); // reviews to be displayed
  const [open, setOpen] = useState(false);

  const getReviews = async () => {
    const reviewQuery = query(collection(db, "modreviews"), where("uid", "==", user.uid));

    const querySnapshot = await getDocs(reviewQuery);
    setReviews(querySnapshot.docs.map(doc => {
      return { ...doc.data(), key: doc.id };
    }))
  }

  useEffect(() => {
    getReviews().then(result => setFinish(true));
    // eslint-disable-next-line
  }, []);

  const handleDelete = (docId) => {
    const deleting = async () => {
      await deleteDoc(doc(db, "modreviews", docId));
    }
    deleting().then(result => window.location.reload());
  }

  // delete alert popup
  const handleClickOpen = (docId) => {
    reviewToDelete = docId;

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (docId) => {
    navigate('../editreview/' + docId);
  };

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
          {/* Printing out reviews from database*/}
          {reviews.map((review) => {
            return(
              <div className="review-box" key={review.key}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={10}>
                    <span style={{fontWeight: 'bold'}}>{review.module}</span>
                    <span> review by {review.user}</span>
                  </Grid>
                  <Grid item xs={2}>
                    <Box display="flex" justifyContent="flex-end">
                      <Tooltip title="Edit review">
                        <IconButton aria-label="Example" onClick={() => handleEdit(review.key)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete review">
                        <IconButton aria-label="Example" onClick={() => handleClickOpen(review.key)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <span>Taken in {review.sem} under {review.prof}</span>
                  </Grid>

                  <Grid item xs={1}>
                    <span style={{fontWeight: 'bold'}}>Overall:</span>
                  </Grid>
                  <Grid item xs={11}>
                    <Rating name="read-only" value={review.rating} readOnly />
                  </Grid>
                  <Grid item xs={1}>
                    <span style={{fontWeight: 'bold'}}>Difficulty:</span>
                  </Grid>
                  <Grid item xs={11}>
                    <LabelledRatingReadOnly value={review.difficulty} />
                  </Grid>
                  <Grid item xs={1}>
                    <span style={{fontWeight: 'bold'}}>Workload:</span>
                  </Grid>
                  <Grid item xs={11}>
                    <LabelledRatingReadOnly value={review.workload} />
                  </Grid>

                  <Grid item xs={12}>
                    {review.text}
                  </Grid>
                </Grid>
              </div>
            )
          })}
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this review?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleted reviews cannot be recovered!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(reviewToDelete)}>
            Delete
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}