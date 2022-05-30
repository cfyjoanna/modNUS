import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useRef } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Reviews() {
  const moduleNameRef = useRef();
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `./addreview`; 
    navigate(path);
  }
  return(
    <div className="wrapper">
      <h2>Reviews</h2>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={modules.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search reviews"
            inputRef={moduleNameRef}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      
        <IconButton aria-label="Example" onClick={routeChange}>
          <AddIcon fontSize="large"/>
        </IconButton>
      
    </div>
  );
}

const modules = [
  { title: 'CS1101S', credits: 4 },
  { title: 'CS2030S', credits: 4 },
  { title: 'GEA1000', credits: 4 },
  { title: 'GEX1025', credits: 4 },
  { title: 'GEC1005', credits: 4 },
];