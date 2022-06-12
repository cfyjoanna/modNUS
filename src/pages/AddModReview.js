import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import { useAuth } from '../hooks/useAuth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

import StarRating from './components/StarRating';
import SearchBar from './components/SearchBar';

function AddModReview() {
  const { user } = useAuth();
  const moduleNameRef = useRef();
  const reviewRef = useRef();
  const navigate = useNavigate();
  const [rating, setRating] = useState(3);

  const handleSubmit = e => {
    // Prevents page from refreshing.
    e.preventDefault();
    // Add a new document with user's name and inputted text.
    const docRef = async () => { await addDoc(collection(db, "test"), {
      User: user.displayName,
      Module: moduleNameRef.current.value,
      Rating: rating,
      Text: reviewRef.current.value,
    })};
    docRef();
    console.log("Document written");
    reviewRef.current.value = null;
    moduleNameRef.current.value = null;
    // Redirect to reviews page after submission.
    navigate("../reviews");
  }
  
  return (
    <div className="wrapper">
      <h2>Add Review</h2>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={2}>
            <span>Module:</span>
          </Grid>
          <Grid item xs={10}>
            <SearchBar refHook={moduleNameRef}/>
          </Grid>
          <Grid item xs={2}>
            <span>Rating:</span>
          </Grid>
          <Grid item xs={10}>
            <StarRating setRating={setRating}/>
          </Grid>
          <Grid item xs={2}>
            <span>Review:</span>
          </Grid>
          <Grid item xs={10}>
            <TextField required multiline fullWidth label="Write review here..." inputRef={reviewRef} />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </div>
  );

}

export default AddModReview;