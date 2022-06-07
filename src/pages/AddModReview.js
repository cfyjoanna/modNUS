import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

import StarRating from './components/StarRating';

function AddModReview() {
  const { user } = useAuth();
  const moduleNameRef = useRef();
  const reviewRef = useRef();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

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
    console.log("Document written:", docRef.id);
    reviewRef.current.value = null;
    moduleNameRef.current.value = null;
    // Redirect to reviews page after submission.
    navigate("../reviews");
  }
  
  return (
    <div className="wrapper">
      <h2>Add Review</h2>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={modules.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label="Search modules"
              inputRef={moduleNameRef}
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
        <br />
        <StarRating setRating={setRating}/>
        <br />
        <TextField required multiline fullWidth label="Write review here..." inputRef={reviewRef} />
        <br /> <br />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </div>
  );

}

const modules = [
  { title: 'CS1101S', credits: 4 },
  { title: 'CS2030S', credits: 4 },
  { title: 'GEA1000', credits: 4 },
  { title: 'GEX1025', credits: 4 },
  { title: 'GEC1005', credits: 4 },
];

export default AddModReview;