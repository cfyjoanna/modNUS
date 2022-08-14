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
var y2s1 = [];
var y2s2 = [];
var y2s1modtypes = [];
var y2s2modtypes = [];
var y3s1 = [];
var y3s2 = [];
var y3s1modtypes = [];
var y3s2modtypes = [];
var y4s1 = [];
var y4s2 = [];
var y4s1modtypes = [];
var y4s2modtypes = [];
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
        y2s1 = docSnap.data().y2s1;
        y2s2 = docSnap.data().y2s2;
        y2s1modtypes = docSnap.data().y2s1modtypes;
        y2s2modtypes = docSnap.data().y2s2modtypes;
        y3s1 = docSnap.data().y3s1;
        y3s2 = docSnap.data().y3s2;
        y3s1modtypes = docSnap.data().y3s1modtypes;
        y3s2modtypes = docSnap.data().y3s2modtypes;
        y4s1 = docSnap.data().y4s1;
        y4s2 = docSnap.data().y4s2;
        y4s1modtypes = docSnap.data().y4s1modtypes;
        y4s2modtypes = docSnap.data().y4s2modtypes;
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

  const updateY2s1 = async (mods) => {
    const docRef = doc(db, "users", user.uid);
 
    await updateDoc(docRef, {
      y2s1: mods
    });
  }
 
  const updateY2s2 = async (mods) => {
    const docRef = doc(db, "users", user.uid);
 
    await updateDoc(docRef, {
      y2s2: mods
    });
  }
 
  const updateY2s1modtypes = async (modtypes) => {
    const docRef = doc(db, "users", user.uid);
 
    await updateDoc(docRef, {
      y2s1modtypes: modtypes,
    });
 
    y2s1modtypes = modtypes;
 
    setFinish(!finish);
  }
 
  const updateY2s2modtypes = async (modtypes) => {
    const docRef = doc(db, "users", user.uid);
 
    await updateDoc(docRef, {
      y2s2modtypes: modtypes,
    });
 
    y2s2modtypes = modtypes;
 
    setFinish(!finish);
  }

  const updateY3s1 = async (mods) => {
    const docRef = doc(db, "users", user.uid);
 
    await updateDoc(docRef, {
      y3s1: mods
    });
  }
 
  const updateY3s2 = async (mods) => {
    const docRef = doc(db, "users", user.uid);
 
    await updateDoc(docRef, {
      y3s2: mods
    });
  }
 
  const updateY3s1modtypes = async (modtypes) => {
    const docRef = doc(db, "users", user.uid);
 
    await updateDoc(docRef, {
      y3s1modtypes: modtypes,
    });
 
    y3s1modtypes = modtypes;
 
    setFinish(!finish);
  }
 
  const updateY3s2modtypes = async (modtypes) => {
    const docRef = doc(db, "users", user.uid);
 
    await updateDoc(docRef, {
      y3s2modtypes: modtypes,
    });
 
    y3s2modtypes = modtypes;
 
    setFinish(!finish);
  }

  const updateY4s1 = async (mods) => {
    const docRef = doc(db, "users", user.uid);
 
    await updateDoc(docRef, {
      y4s1: mods
    });
  }
 
  const updateY4s2 = async (mods) => {
    const docRef = doc(db, "users", user.uid);
 
    await updateDoc(docRef, {
      y4s2: mods
    });
  }
 
  const updateY4s1modtypes = async (modtypes) => {
    const docRef = doc(db, "users", user.uid);
 
    await updateDoc(docRef, {
      y4s1modtypes: modtypes,
    });
 
    y4s1modtypes = modtypes;
 
    setFinish(!finish);
  }
 
  const updateY4s2modtypes = async (modtypes) => {
    const docRef = doc(db, "users", user.uid);
 
    await updateDoc(docRef, {
      y4s2modtypes: modtypes,
    });
 
    y4s2modtypes = modtypes;
 
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

          <h3>Y2S1</h3>
          <PlannerMods updater={updateY2s1} mods={y2s1} modtypes={y2s1modtypes} sem={3}
            updateCoreMCs={updateCoreMCs} updateUes={updateUes} updateModtypes={updateY2s1modtypes} />

          <h3>Y2S2</h3>
          <PlannerMods updater={updateY2s2} mods={y2s2} modtypes={y2s2modtypes} sem={4}
            updateCoreMCs={updateCoreMCs} updateUes={updateUes} updateModtypes={updateY2s2modtypes} />

          <h3>Y3S1</h3>
          <PlannerMods updater={updateY3s1} mods={y3s1} modtypes={y3s1modtypes} sem={5}
            updateCoreMCs={updateCoreMCs} updateUes={updateUes} updateModtypes={updateY3s1modtypes} />

          <h3>Y3S2</h3>
          <PlannerMods updater={updateY3s2} mods={y3s2} modtypes={y3s2modtypes} sem={6}
            updateCoreMCs={updateCoreMCs} updateUes={updateUes} updateModtypes={updateY3s2modtypes} />

          <h3>Y4S1</h3>
          <PlannerMods updater={updateY4s1} mods={y4s1} modtypes={y4s1modtypes} sem={7}
            updateCoreMCs={updateCoreMCs} updateUes={updateUes} updateModtypes={updateY4s1modtypes} />

          <h3>Y4S2</h3>
          <PlannerMods updater={updateY4s2} mods={y4s2} modtypes={y4s2modtypes} sem={8}
            updateCoreMCs={updateCoreMCs} updateUes={updateUes} updateModtypes={updateY4s2modtypes} />
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