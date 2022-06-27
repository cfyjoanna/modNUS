import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import SearchBar from './SearchBar';
import ModuleList from './ModuleList';
import { Button } from '@mui/material';

/* Basically the same as SearchModules, except with added function of retrieving data from the database. */
export default function PlannerMods({ updater, mods, modtypes, sem, updateCoreMCs, updateUes, updateModtypes }) {;
  const [modulesChosen, setModulesChosen] = useState(mods);
  const [finalModtypes, setFinalModtypes] = useState([]);
  const moduleNameRef = useRef();

  useEffect(() => {
    setModulesChosen(mods);
  }, [mods])

  useEffect(() => {
    if (typeof modtypes !== "undefined" && modtypes.length > 0) {
      setFinalModtypes(modtypes);
    }
  }, [modtypes])
  
  const handleModulesChosen = e => {
    const modName = moduleNameRef.current.value;
    if (modName === '') return;
    setModulesChosen(prevMods => {
      if (!prevMods.includes(modName)) {
        updater([...prevMods, modName]);
        modtypes.push(0);
        return [...prevMods, modName];
      } else {
        return prevMods;
      }
    });

    updateModtypes(modtypes);
    moduleNameRef.current.value = null;
  };

  const handleClear = e => {
    setModulesChosen([]);
    updater([]);
    updateModtypes([]);
    updateCoreMCs(0, sem);
    updateUes(0, sem);
  }

  return (
    <>
      <SearchBar refHook={moduleNameRef} />
      <Button variant="contained" color="primary" onClick={handleModulesChosen}>Add Module</Button>
      <span> </span>
      <Button variant="contained" color="primary" onClick={handleClear}>Clear</Button>
      <div>
       <ModuleList mods={modulesChosen} modtypes={finalModtypes} sem={sem}
        updateCoreMCs={updateCoreMCs} updateUes={updateUes} updateModtypes={updateModtypes} />
      </div>
      
      </>
  );
}