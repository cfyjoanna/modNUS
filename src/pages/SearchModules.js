import React, { useState } from 'react';
import { useRef } from 'react';
import SearchBar from './components/SearchBar';
import TimetableModuleList from './components/TimetableModuleList';
import { Button } from '@mui/material';

export default function SearchModules() {
  const [modulesChosen, setModulesChosen] = useState([])
  const moduleNameRef = useRef();

  const handleModulesChosen = e => {
    const modName = moduleNameRef.current.value;
    if (modName === '') return;
    setModulesChosen(prevMods => {
      if (!prevMods.includes(modName)) {
        return [...prevMods, modName]
      } else {
        return prevMods;
      }
    });
    moduleNameRef.current.value = null;
  };

  const handleClear = e => {
    setModulesChosen([]);
  }

  return (
    <>
      <SearchBar refHook={moduleNameRef}/>
      <Button variant="contained" color="primary" onClick={handleModulesChosen}>Add Module</Button>
      <span> </span>
      <Button variant="contained" color="primary" onClick={handleClear}>Clear</Button>
      <div>
       <TimetableModuleList mods={modulesChosen} />
      </div>
      
      </>
  );
}