import React from 'react';
import ModTypeDropdown from './ModTypeDropdown';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { nusmodsData } from '../data/nusmodsData';

export default function ModuleList({ mods, modtypes, sem, deleteMod, updateCoreMCs, updateUes, updateModtypes }) {
  let counter = 0;

  return(
    mods.map(mod => {
      counter = counter + 1;

      const currMod = nusmodsData.find(module => module.moduleCode === mod);

      return typeof(currMod) === 'undefined' ? "" : (
        <div className="module-box" key={mod}>
          <ModTypeDropdown credits={parseInt(currMod.moduleCredit)} modtypes={modtypes} index={counter - 1} sem={sem}
            updateCoreMCs={updateCoreMCs} updateUes={updateUes} updateModtypes={updateModtypes} />

          {counter}. {mod} {currMod.title} - {parseInt(currMod.moduleCredit)} MCs

          <div className="right-wrapper">
            <IconButton edge="end" onClick={() => deleteMod(mod, parseInt(currMod.moduleCredit))}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      )
    })
  );
}