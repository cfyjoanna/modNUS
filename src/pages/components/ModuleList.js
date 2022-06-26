import React from 'react';
import ModTypeDropdown from './ModTypeDropdown';

export default function ModuleList({ mods, updateCoreMCs }) {
  let counter = 0;
  return(
    mods.map(mod => {
      counter = counter + 1;
      return(
        <div className="module-box" key={mod}>
          <ModTypeDropdown updateCoreMCs={updateCoreMCs} />
          {counter}. {mod}
        </div>
      )
    })
  );
}

