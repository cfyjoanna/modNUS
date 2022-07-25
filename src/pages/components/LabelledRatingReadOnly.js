import React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

const labels = {
  1: 'Very low',
  2: 'Low',
  3: 'Average',
  4: 'High',
  5: 'Very high',
};

export default function LabelledRatingReadOnly({ value }) {

  return (
    <Box
      sx={{
        width: 300,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        
      />
      <Box sx={{ ml: 2 }}>{labels[value]}</Box>
    </Box>
  );
} 