import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();
  const pfp = user.photoURL;

  return(
    <div className="wrapper">
      <h2>Profile</h2>
      <img src={pfp} alt="Avatar" referrerpolicy="no-referrer"/>
    </div>
  );
}