import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

const labels = {
  1: 'Very low',
  2: 'Low',
  3: 'Average',
  4: 'High',
  5: 'Very high',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function LabelledStarRating({ setRating, initial }) {
  const [value, setValue] = useState(3);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    if (typeof initial !== "undefined") {
      setValue(initial);
    }
  }, [initial])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            setValue(newValue);
            setRating(newValue);
          }
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}