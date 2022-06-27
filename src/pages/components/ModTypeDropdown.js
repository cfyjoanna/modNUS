import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function ModTypeDropdown( { credits, modtypes, index, sem, updateCoreMCs, updateUes, updateModtypes }) {
  var startingType = 0;
  if (typeof modtypes[index] !== "undefined") {
    startingType = modtypes[index];
  }
  const [modType, setModType] = useState(startingType);

  const handleChange = (event) => {
    if (modType === 1) {
      updateCoreMCs(-credits, sem);
    }

    if (modType === 2) {
      updateUes(-credits, sem);
    }

    setModType(event.target.value);

    if (event.target.value === 1) {
      updateCoreMCs(credits, sem);
    }
    
    if (event.target.value === 2) {
      updateUes(credits, sem);
    }

    modtypes[index] = event.target.value;
    updateModtypes(modtypes);
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
          <MenuItem value={0}>
              <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Core Mod</MenuItem>
          <MenuItem value={2}>UE</MenuItem>
      </Select>
    </FormControl>
  )
}