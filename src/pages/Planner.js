import React from 'react';
import SearchModules from './SearchModules';

export default function Planner() {
  return(
    <div className="wrapper">
      <h2>Planner</h2>

      <h3>Y1S1</h3>
      <SearchModules />

      <h3>Y1S2</h3>
      <SearchModules />
    </div>
  );
}