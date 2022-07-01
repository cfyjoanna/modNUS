import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { modules } from '../data/Modules.js';

function SearchBar({ refHook }) {
  
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      disableClearable
      options={modules.map((option) => option.courseId)}
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