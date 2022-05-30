import React from 'react';
import SearchModules from '../SearchModules';

export default function Planner() {
  {/*const [y1s1, setY1s1] = useState([]);
  const y1s1NameRef = useRef();

  const handleAddY1s1 = mod => {
    const modName = y1s1NameRef.current.value;
    if (modName === '') return;
    setY1s1(prevMods => {
      return [...prevMods, modName]
    });
    y1s1NameRef.current.value = null;
  };

  const [y1s2, setY1s2] = useState([]);
  const y1s2NameRef = useRef();

  const handleAddY1s2 = mod => {
    const modName = y1s2NameRef.current.value;
    if (modName === '') return;
    setY1s2(prevMods => {
      return [...prevMods, modName]
    });
    y1s2NameRef.current.value = null;
  };*/}
  return(
    <div className="wrapper">
      <h2>Planner</h2>

      <h3>Y1S1</h3>
      <SearchModules></SearchModules>
      
      {/*<PlannerModules mods={y1s1} />
       <input ref={y1s1NameRef} type="text" />
  <button onClick={handleAddY1s1}>Add Module</button>*/}
      

      <h3>Y1S2</h3>
      <SearchModules></SearchModules>
      {/*<PlannerModules mods={y1s2} />
      <input ref={y1s2NameRef} type="text" />
<button onClick={handleAddY1s2}>Add Module</button>*/}
    </div>
  );
}