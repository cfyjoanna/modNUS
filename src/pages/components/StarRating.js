import React, { useState } from 'react';
import Rating from '@mui/material/Rating';

// setRating is a function; should be updating a state
function StarRating({ setRating }) {
  const [value, setValue] = useState(3);
  return (
    <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setRating(newValue);
        }}
    />
  )
}

export default StarRating;