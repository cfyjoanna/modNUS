import React, { useState } from 'react';
import PlannerMods from './components/PlannerMods';
import { useAuth } from '../hooks/useAuth';
import { db } from '../config/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

import { Grid } from '@mui/material';

var y1s1 = [];
var y1s2 = [];
var coreMCs = 0;
var ues = 0;

export default function Planner() {
  const { user } = useAuth();
  // eslint-disable-next-line
  const [finish, setFinish] = useState(false);
  
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

  const getMods = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    y1s1 = docSnap.data().y1s1;
    y1s2 = docSnap.data().y1s2;
    coreMCs = docSnap.data().coremcs;
    ues = docSnap.data().ues;
  }
  getMods().then(result => setFinish(true));

  const updateCoreMCs = async (mcs) => {
    const docRef = doc(db, "users", user.uid);

    await updateDoc(docRef, {
      coremcs: coreMCs + mcs,
    });

    coreMCs = coreMCs + mcs;
    console.log(coreMCs)

    setFinish(!finish);
  }
  
  return(
    <div className="wrapper">
      <h2>Planner</h2>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h3>Y1S1</h3>
          <PlannerMods updater={updateY1s1} mods={y1s1} updateCoreMCs={updateCoreMCs} />

          <h3>Y1S2</h3>
          <PlannerMods updater={updateY1s2} mods={y1s2} />
        </Grid>
        <Grid item xs={4}>
          <h3>MCs Taken</h3>
          <span>{coreMCs} core MCs</span>
          <br />
          <span>{ues} UEs</span>
        </Grid>
      </Grid>
    </div>
  );
}