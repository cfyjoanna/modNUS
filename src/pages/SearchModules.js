import * as React from 'react';
import { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ModuleList from './components/ModuleList';
import { Button } from '@mui/material';

export default function SearchModules() {
  const [modulesChosen, setModulesChosen] = React.useState([])
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
       <ModuleList mods={modulesChosen} />
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
