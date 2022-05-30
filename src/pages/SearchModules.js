import * as React from 'react';
import { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PlannerModules from './planner/PlannerModules';
import { Button } from '@material-ui/core';

export default function SearchModules() {
  const [modulesChosen, setModulesChosen] = React.useState([])
  const moduleNameRef = useRef();

  const handleModulesChosen = mod => {
    const modName = moduleNameRef.current.value;
    if (modName === '') return;
    setModulesChosen(prevMods => {
      if (prevMods.includes(modName)) {
        return [...prevMods];
      } else {
        return [...prevMods, modName]
      }
    });
    moduleNameRef.current.value = null;
  };

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
      <div>
       <PlannerModules mods={modulesChosen} />
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
