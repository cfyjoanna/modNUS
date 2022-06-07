import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
        <SearchBar refHook={moduleNameRef}/>
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

export default AddModReview;