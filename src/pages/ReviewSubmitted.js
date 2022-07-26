import React from 'react';

export default function ReviewSubmitted() {
  setTimeout(() => {
    window.location.replace('/reviews');
  }, 3000);

  return (
    <>
      <div className="center-wrapper">
        <h1>Your review has been submitted!</h1>
      </div>
    </>
  )
}