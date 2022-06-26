import React from 'react';
import ModTypeDropdown from './ModTypeDropdown';

export default function ModuleList({ mods, updateCoreMCs, updateUes }) {
  let counter = 0;
  return(
    mods.map(mod => {
      counter = counter + 1;
      const currMod = modules.find(obj => obj.title === mod);
      return(
        <div className="module-box" key={mod}>
          <ModTypeDropdown credits={currMod.credits} updateCoreMCs={updateCoreMCs} updateUes={updateUes} />
          {counter}. {mod}
        </div>
      )
    })
  );
}

const modules = [
  { title: 'CS1101S', credits: 4 },
  { title: 'CS2030S', credits: 4 },
  { title: 'GEA1000', credits: 4 },
  { title: 'GEX1025', credits: 4 },
  { title: 'GEC1005', credits: 4 },
];