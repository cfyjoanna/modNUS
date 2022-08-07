import React from 'react';
import Box from '@mui/material/Box';

export default function ReviewSubmitted() {
  setTimeout(() => {
    window.location.replace('/');
  }, 3000);

  return (
    <>
      <div className="center-wrapper">
        <Box justifyContent="center">
          <h1>Sorry! There was an error loading your data.</h1>
          <span>If you think this is an error, try contacting us or signing in with a different account.</span>
        </Box>
      </div>
    </>
  )
}