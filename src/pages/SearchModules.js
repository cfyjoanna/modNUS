import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchModules() {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={modules.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search modules"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  );
}

const modules = [
  { title: 'CS1101S', year: 1994 },
  { title: 'CS2030S', year: 1972 },
  { title: 'GEA1000', year: 1974 },
  { title: 'GEX1025', year: 1975 },
  { title: 'GEC1005', year: 1975 },
];
