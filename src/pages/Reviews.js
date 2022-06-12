import React, { useState, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Rating from '@mui/material/Rating';
import { Grid } from '@mui/material';

import { Link } from 'react-router-dom';

import { collection, getDocs, query, where } from 'firebase/firestore'; 
import { db } from '../config/firebaseConfig.js';

import AddReview from './AddReview/AddReview.js'
import SearchBar from './components/SearchBar.js';

export default function Reviews() {
  const moduleNameRef = useRef();
  const [buttonPopup, setButtonPopup] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewIds, setIds] = useState([]);

  async function handleSearch() {
    setReviews([]);
    const reviewQuery = query(collection(db, "test"), where("Module", "==", moduleNameRef.current.value));

    const querySnapshot = await getDocs(reviewQuery);
    querySnapshot.forEach((doc) => {
      if(!reviewIds.includes(doc.id)) {
        setReviews(prev => [...prev, { ...doc.data(), key: doc.id}]);
        setIds(prev => [...prev, doc.id]);
      }
    });
    moduleNameRef.current.value = null;
  }

  return (
    <div className="wrapper">
      <h2>Reviews</h2>

      {/* Search bar and icon */}
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={11}>
          <SearchBar refHook={moduleNameRef} />
        </Grid>
        <Grid item xs={1}>
        <IconButton aria-label="search" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
        </Grid>
      </Grid>
      
      {/* Popup button */}
      <IconButton aria-label="Example" onClick={() => setButtonPopup(true)} size="large">
        <AddIcon fontSize="large"/>
      </IconButton>
      <AddReview trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h2>Add review</h2>
      </AddReview>

      <Link to='../addmodreview' style={{ textDecoration: 'none' }}>
        <Button variant="contained">add review</Button>
      </Link>

      {/* Printing out reviews from database*/}
      {reviews.map((review) => {
        return(
          <div key={review.key}>
            <h4>{review.Module} - {review.User}</h4>
            <Rating name="read-only" value={review.Rating} readOnly />
            <br /> <br />
            {review.Text}
          </div>
        )
      })}
    </div>
  );
}