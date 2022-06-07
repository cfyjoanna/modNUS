import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query } from "firebase/firestore"; 
import { db } from '../config/firebaseConfig.js';

import AddReview from './AddReview/AddReview.js'

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [reviewIds, setIds] = useState([]);

  async function queryForReviews() {
    const reviewQuery = query(collection(db, "test"));

    const querySnapshot = await getDocs(reviewQuery);
    querySnapshot.forEach((doc) => {
      if(!reviewIds.includes(doc.id)) {
        setReviews(prev => [...prev, { ...doc.data(), key: doc.id}]);
        setIds(prev => [...prev, doc.id]);
      }
    });
  }
  queryForReviews();

  const moduleNameRef = useRef();
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div className="wrapper">
      <h2>Reviews</h2>

      {/* Autocomplete search bar */}
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={modules.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search reviews"
            inputRef={moduleNameRef}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      
      {/* Popup button */}
      <IconButton aria-label="Example" onClick={() => setButtonPopup(true)} size="large">
        <AddIcon fontSize="large"/>
      </IconButton>
      <AddReview trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h2>Add review</h2>
      </AddReview>

      <Link to='../addmodreview'>
        <Button>add review</Button>
      </Link>

      {/* Printing out reviews from database*/}
      {reviews.map((review) => {
        return(
          <div key={review.key}><h4>{review.Module} - {review.User}</h4>{review.Text}</div>
        )
      })}
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