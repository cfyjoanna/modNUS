import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { useAuth } from '../hooks/useAuth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

import StarRating from './components/StarRating';
import LabelledStarRating from './components/LabelledStarRating';
import SearchBar from './components/SearchBar';

function AddModReview() {
  const { user } = useAuth();
  const navigate = useNavigate();
  // review input hooks
  const moduleNameRef = useRef();
  const profRef = useRef();
  const reviewRef = useRef();
  const [sem, setSem] = useState('');
  const [rating, setRating] = useState(3);
  const [difficulty, setDifficulty] = useState(3);
  const [workload, setWorkload] = useState(3);

  const handleSubmit = event => {
    // Prevents page from refreshing.
    event.preventDefault();
    // Add a new document with user's name and inputted text.
    const docRef = async () => { await setDoc(doc(db, "modreviews", moduleNameRef.current.value + user.uid), {
      user: user.displayName,
      uid: user.uid,
      module: moduleNameRef.current.value,
      prof: profRef.current.value,
      sem: sem,
      rating: rating,
      difficulty: difficulty,
      workload: workload,
      text: reviewRef.current.value,
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
          {/* Module details inputs */}
          <Grid item xs={2}>
            <span>Module:</span>
          </Grid>
          <Grid item xs={10}>
            <SearchBar refHook={moduleNameRef}/>
          </Grid>

          <Grid item xs={2}>
            <span>Professor:</span>
          </Grid>
          <Grid item xs={10}>
            <TextField required label="Write professor's full name here..." inputRef={profRef} />
          </Grid>

          <Grid item xs={2}>
            <span>Semester:</span>
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="outlined-select-semester"
              select
              required
              label="Select"
              value={sem}
              onChange={(event) => {setSem(event.target.value);}}
              helperText="Please select your semester"
            >
              {semesters.map((option) => (
                <MenuItem key={option.key} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          {/* Ratings */}
          <Grid item xs={2}>
            <span>Rating:</span>
          </Grid>
          <Grid item xs={10}>
            <StarRating setRating={setRating}/>
          </Grid>

          <Grid item xs={2}>
            <span>Difficulty:</span>
          </Grid>
          <Grid item xs={10}>
            <LabelledStarRating setRating={setDifficulty}/>
          </Grid>

          <Grid item xs={2}>
            <span>Workload:</span>
          </Grid>
          <Grid item xs={10}>
            <LabelledStarRating setRating={setWorkload}/>
          </Grid>

          {/* Review text input */}
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

const semesters = [
  { label: "AY 21/22 Sem 1", key: 21221 },
  { label: "AY 21/22 Sem 2", key: 21222 }
]

export default AddModReview;