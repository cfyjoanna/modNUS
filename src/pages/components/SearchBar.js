import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { nusmodsData } from '../data/nusmodsData.js';

function SearchBar({ refHook }) {

  const OPTIONS_LIMIT = 25;
  const defaultFilterOptions = createFilterOptions();

  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  return (
    <Autocomplete
      filterOptions={filterOptions}
      disablePortal
      id="combo-box-demo"
      disableClearable
      options={nusmodsData.map((option) => option.moduleCode)}
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