import React, { useState } from 'react';
import SearchModules from './SearchModules';
import PlannerMods from './components/PlannerMods';
import { useAuth } from '../hooks/useAuth';
import { db } from '../config/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

var y1s1 = [];

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

  const getMods = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    y1s1 = docSnap.data().y1s1;
  }
  getMods().then(result => setFinish(true));
  
  return(
    <div className="wrapper">
      <h2>Planner</h2>

      <h3>Y1S1</h3>
      <PlannerMods updater={updateY1s1} mods={y1s1} />

      <h3>Y1S2</h3>
      <SearchModules />
    </div>
  );
}