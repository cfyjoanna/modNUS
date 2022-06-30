import React, { useState, useEffect, Fragment } from 'react';
import { useRef } from 'react';
import SearchBar from './SearchBar';
import ModuleList from './ModuleList';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

/* Basically the same as SearchModules, except with added function of retrieving data from the database. */
export default function PlannerMods({ updater, mods, modtypes, sem, updateCoreMCs, updateUes, updateModtypes }) {;
  const [modulesChosen, setModulesChosen] = useState(mods);
  const [finalModtypes, setFinalModtypes] = useState([]);
  const [open, setOpen] = React.useState(false);
  const moduleNameRef = useRef();

  useEffect(() => {
    setModulesChosen(mods);
  }, [mods])

  useEffect(() => {
    if (typeof modtypes !== "undefined" && modtypes.length > 0) {
      setFinalModtypes(modtypes);
    }
  }, [modtypes])
  
  const handleModulesChosen = e => {
    const modName = moduleNameRef.current.value;
    if (modName === '') return;
    setModulesChosen(prevMods => {
      if (!prevMods.includes(modName)) {
        updater([...prevMods, modName]);
        modtypes.push(0);
        return [...prevMods, modName];
      } else {
        return prevMods;
      }
    });

    updateModtypes(modtypes);
    setOpen(true);
    moduleNameRef.current.value = null;
  };

  const handleClear = e => {
    setModulesChosen([]);
    updater([]);
    updateModtypes([]);
    updateCoreMCs(0, sem);
    updateUes(0, sem);
  }

  // for snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <>
      <SearchBar refHook={moduleNameRef} />
      <Button variant="contained" color="primary" onClick={handleModulesChosen}>Add Module</Button>
      <span> </span>
      <Button variant="contained" color="primary" onClick={handleClear}>Clear</Button>
      <div>
       <ModuleList mods={modulesChosen} modtypes={finalModtypes} sem={sem}
        updateCoreMCs={updateCoreMCs} updateUes={updateUes} updateModtypes={updateModtypes} />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Module added!"
        action={action}
      />
      
    </>
  );
}