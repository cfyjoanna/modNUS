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

  // may be able to remove reviewIds and setIds?
  async function handleSearch() {
    setReviews([]);
    setIds([]);
    const reviewQuery = query(collection(db, "test"), where("module", "==", moduleNameRef.current.value));

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
          <div className="review-box" key={review.key}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12}>
                <span style={{fontWeight: 'bold'}}>{review.module}</span>
                <span> review by {review.user}</span>
              </Grid>
              <Grid item xs={1}>
                <span style={{fontWeight: 'bold'}}>Overall:</span>
              </Grid>
              <Grid item xs={11}>
                <Rating name="read-only" value={review.rating} readOnly />
              </Grid>
              <Grid item xs={12}>
                {review.text}
              </Grid>
            </Grid>
          </div>
        )
      })}
    </div>
  );
}