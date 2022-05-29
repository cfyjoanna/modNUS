import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

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
      <div className="wrapper">
        <h2>Home</h2>
        <span>
          Welcome to modNUS, {name}!
          <br /><br />
          Here you can <Link to='/generator'>get help to plan your timetable</Link>, <Link to='/planner'>plan your academic years efficiently</Link> and <Link to='/reviews'>check out what others think about any module</Link>.
        </span>
      </div>
    </>
  );
}