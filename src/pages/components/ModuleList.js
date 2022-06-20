import React from 'react';


export default function ModuleList({ mods }) {
    let counter = 0
    return(
        mods.map(mod => {
            counter = counter + 1;
            return(
                <span>
                    {counter}. {mod}
                    <br />
                </span>
            )
        })
    );
}