import React, { useState, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import Rating from '@mui/material/Rating';

import { Link } from 'react-router-dom';

import { collection, getDocs, query } from 'firebase/firestore'; 
import { db } from '../config/firebaseConfig.js';

import AddReview from './AddReview/AddReview.js'
import SearchBar from './components/SearchBar.js';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [reviewIds, setIds] = useState([]);

  // weird bug where there is a chance of duplicates of each review in reviews?? may be bc of async idk
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

      <SearchBar refHook={moduleNameRef} />
      
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