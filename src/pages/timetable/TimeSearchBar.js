import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function TimeSearchBar({ refHook , label}) {
  const times = [
    "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"
  ];
  
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      disableClearable
      options={times.map((option) => option)}
      renderInput={(params) => (
        <TextField
          {...params}
          required
          label={label}
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

export default TimeSearchBar;