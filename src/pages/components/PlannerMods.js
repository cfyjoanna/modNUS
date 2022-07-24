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
  const [finalModtypes, setFinalModtypes] = useState([]); // to initialise modtypes from database
  const [open, setOpen] = useState(false); // module added snackbar
  const [added, setAdded] = useState(false); // module already added snackbar
  const moduleNameRef = useRef();

  useEffect(() => {
    setModulesChosen(mods);
  }, [mods])

  // modtypes may change to undefined for an unknown reason. This is a temporary measure to prevent errors
  useEffect(() => {
    if (typeof modtypes !== "undefined") {
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
        setOpen(true);
        return [...prevMods, modName];
      } else {
        setAdded(true);
        return prevMods;
      }
    });

    updateModtypes(modtypes);
    moduleNameRef.current.value = null;
  };

  const handleClear = e => {
    setModulesChosen([]);
    updater([]);
    updateModtypes([]);
    updateCoreMCs(0, sem);
    updateUes(0, sem);
  }

  // for "module added" snackbar
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

  // for "module already added" snackbar
  const handleAddedClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAdded(false);
  };

  const addedAction = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleAddedClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  // to pass to ModuleList for deletion of a single module
  const deleteOneModule = (mod, mcs) => {
    const delIndex = modulesChosen.indexOf(mod);
    const modtype = modtypes[delIndex];
    var tempMods = modulesChosen;

    tempMods.splice(delIndex, 1);
    modtypes.splice(delIndex, 1);

    setModulesChosen(tempMods);
    updater(tempMods);
    updateModtypes(modtypes);

    if (modtype === 1) {
      updateCoreMCs(-mcs, sem);
    } else if (modtype === 2) {
      updateUes(-mcs, sem);
    }
  }

  return (
    <>
      <SearchBar refHook={moduleNameRef} />
      <Button variant="contained" color="primary" onClick={handleModulesChosen}>Add Module</Button>
      <span> </span>
      <Button variant="contained" color="primary" onClick={handleClear}>Clear</Button>
      <div>
       <ModuleList mods={modulesChosen} modtypes={finalModtypes} sem={sem} deleteMod={deleteOneModule}
        updateCoreMCs={updateCoreMCs} updateUes={updateUes} updateModtypes={updateModtypes} />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Module added!"
        action={action}
      />
      <Snackbar
        open={added}
        autoHideDuration={3000}
        onClose={handleAddedClose}
        message="You have already added this module."
        action={addedAction}
      />
      
    </>
  );
}