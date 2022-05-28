import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Home() {

  const [name, setName] = useState("Loading...");
  const { user } = useAuth();

  useEffect(() => {
      if(user?.displayName) {
        setName(user.displayName);
      }
  }, [user])

  return(
    <>
      <h2>Home</h2>
      <h3>Welcome, {name}.</h3>
    </>
  );
}