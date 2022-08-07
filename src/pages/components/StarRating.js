import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';

// setRating is a function; should be updating a state
function StarRating({ setRating, initial }) {
  const [value, setValue] = useState(3);

  useEffect(() => {
    if (typeof initial !== "undefined") {
      setValue(initial);
    }
  }, [initial]);

  return (
    <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            setValue(newValue);
            setRating(newValue);
          }
        }}
    />
  )
}

export default StarRating;