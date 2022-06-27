import React from 'react';

export default function TimetableModuleList({ mods }) {
  let counter = 0;
  return(
    mods.map(mod => {
      counter = counter + 1;
      return(
        <div className="module-box" key={mod}>
          {counter}. {mod}
        </div>
      )
    })
  );
}
