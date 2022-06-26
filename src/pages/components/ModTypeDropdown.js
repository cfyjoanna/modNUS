import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function ModTypeDropdown( { credits, updateCoreMCs, updateUes }) {
  const [modType, setModType] = useState("");

  const handleChange = (event) => {
    if (modType === 1) {
      updateCoreMCs(-credits);
    }

    if (modType === 2) {
      updateUes(-credits);
    }

    setModType(event.target.value);

    if (event.target.value === 1) {
      updateCoreMCs(credits);
    }
    
    if (event.target.value === 2) {
      updateUes(credits);
    }
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={modType}
          onChange={handleChange}
          displayEmpty
          size="small"
          >
          <MenuItem value="">
              <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Core Mod</MenuItem>
          <MenuItem value={2}>UE</MenuItem>
      </Select>
    </FormControl>
  )
}