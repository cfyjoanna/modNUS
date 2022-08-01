import React, { useEffect, useState } from 'react';
import PlannerMods from './components/PlannerMods';
import PlannerGEList from './components/PlannerGEList';
import { useAuth } from '../hooks/useAuth';
import { db } from '../config/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

import { Grid } from '@mui/material';

var y1s1 = [];
var y1s2 = [];
var y1s1modtypes = [];
var y1s2modtypes = [];
var coreMCs = [];
var ues = [];
var ges = [];

/* Children components: components PlannerMods (SearchBar) > ModuleList > ModTypeDropDown. */
export default function Planner() {
  const { user } = useAuth();
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    const getMods = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        y1s1 = docSnap.data().y1s1;
        y1s2 = docSnap.data().y1s2;
        y1s1modtypes = docSnap.data().y1s1modtypes;
        y1s2modtypes = docSnap.data().y1s2modtypes;
        coreMCs = docSnap.data().coremcs;
        ues = docSnap.data().ues;
        ges = docSnap.data().ges;
      } else {
        // doc.data() will be undefined in this case
          window.location.replace('/errorpage');
      }
    }
    getMods().then(result => setFinish(true));
    // eslint-disable-next-line
  }, [])
  
  const updateY1s1 = async (mods) => {
    const docRef = doc(db, "users", user.uid);

    await updateDoc(docRef, {
      y1s1: mods
    });
  }

  const updateY1s2 = async (mods) => {
    const docRef = doc(db, "users", user.uid);

    await updateDoc(docRef, {
      y1s2: mods
    });
  }

  const updateY1s1modtypes = async (modtypes) => {
    const docRef = doc(db, "users", user.uid);

    await updateDoc(docRef, {
      y1s1modtypes: modtypes,
    });

    y1s1modtypes = modtypes;

    setFinish(!finish);
  }

  const updateY1s2modtypes = async (modtypes) => {
    const docRef = doc(db, "users", user.uid);

    await updateDoc(docRef, {
      y1s2modtypes: modtypes,
    });

    y1s2modtypes = modtypes;

    setFinish(!finish);
  }

  /* mcs is the amount to increase MCs by; if mcs is 0, the sem is updated to have 0 MCs. */
  const updateCoreMCs = async (mcs, sem) => {
    const docRef = doc(db, "users", user.uid);

    coreMCs[sem] += mcs;
    if (mcs === 0) {
      coreMCs[0] -= coreMCs[sem];
      coreMCs[sem] = 0;
    } else {
      coreMCs[0] += mcs;
    }

    await updateDoc(docRef, {
      coremcs: coreMCs,
    });

    setFinish(!finish);
  }

  /* mcs is the amount to increase MCs by; if mcs is 0, the sem is updated to have 0 MCs. */
  const updateUes = async (mcs, sem) => {
    const docRef = doc(db, "users", user.uid);

    ues[sem] += mcs;
    if (mcs === 0) {
      ues[0] -= ues[sem];
      ues[sem] = 0;
    } else {
      ues[0] += mcs;
    }

    await updateDoc(docRef, {
      ues: ues,
    });

    setFinish(!finish);
  }

  const updateGes = async (newGes) => {
    const docRef = doc(db, "users", user.uid);

    await updateDoc(docRef, {
      ges: newGes,
    });

    ges = newGes;

    setFinish(!finish);
  }
  
  return(
    <div className="wrapper">
      <h2>Planner</h2>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h3>Y1S1</h3>
          <PlannerMods updater={updateY1s1} mods={y1s1} modtypes={y1s1modtypes} sem={1}
            updateCoreMCs={updateCoreMCs} updateUes={updateUes} updateModtypes={updateY1s1modtypes} />

          <h3>Y1S2</h3>
          <PlannerMods updater={updateY1s2} mods={y1s2} modtypes={y1s2modtypes} sem={2}
            updateCoreMCs={updateCoreMCs} updateUes={updateUes} updateModtypes={updateY1s2modtypes} />
        </Grid>
        <Grid item xs={4}>
          <h3>MCs Taken</h3>
          <span>{coreMCs[0]} core MCs</span>
          <br />
          <span>{ues[0]} UEs</span>

          <h3>GEs Cleared</h3>
          <PlannerGEList ges={ges} updateGes={updateGes}/>
        </Grid>
      </Grid>
    </div>
  );
}