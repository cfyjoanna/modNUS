import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ModuleList from './ModuleList';
import { Button } from '@mui/material';

/* Basically the same as SearchModules, except with added function of retrieving data from the database. */
export default function PlannerMods({ updater, mods, updateCoreMCs }) {
  const [modulesChosen, setModulesChosen] = useState(mods);
  const moduleNameRef = useRef();

  useEffect(() => {
    setModulesChosen(mods);
  }, [mods])
  
  const handleModulesChosen = e => {
    const modName = moduleNameRef.current.value;
    if (modName === '') return;
    setModulesChosen(prevMods => {
      if (!prevMods.includes(modName)) {
        updater([...prevMods, modName]);
        return [...prevMods, modName];
      } else {
        return prevMods;
      }
    });

    moduleNameRef.current.value = null;
  };

  const handleClear = e => {
    setModulesChosen([]);
    updater([]);
  }

  return (
    <>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={modules.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search modules"
            inputRef={moduleNameRef}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      <Button variant="contained" color="primary" onClick={handleModulesChosen}>Add Module</Button>
      <span> </span>
      <Button variant="contained" color="primary" onClick={handleClear}>Clear</Button>
      <div>
       <ModuleList mods={modulesChosen} updateCoreMCs={updateCoreMCs} />
      </div>
      
      </>
  );
}

const modules = [
  { title: 'CS1101S', credits: 4 },
  { title: 'CS2030S', credits: 4 },
  { title: 'GEA1000', credits: 4 },
  { title: 'GEX1025', credits: 4 },
  { title: 'GEC1005', credits: 4 },
];
