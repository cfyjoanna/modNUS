import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function SearchBar({ refHook }) {
  const modules = [
    { title: 'CS1101S', credits: 4 },
    { title: 'CS2030S', credits: 4 },
    { title: 'GEA1000', credits: 4 },
    { title: 'GEX1025', credits: 4 },
    { title: 'GEC1005', credits: 4 },
  ];
  
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      disableClearable
      options={modules.map((option) => option.title)}
      renderInput={(params) => (
        <TextField
          {...params}
          required
          label="Search modules"
          inputRef={refHook}
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
  )
}

export default SearchBar;