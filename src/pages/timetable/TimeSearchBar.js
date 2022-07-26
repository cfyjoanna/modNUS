import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function TimeSearchBar({ refHook , label}) {
  const times = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", 
    "16:00", "17:00", "18:00", "19:00", "20:00"
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