import React from 'react';

export default function PlannerModules({ mods }) {
    return(
        mods.map(mod => {
            return(
                <span>
                    {mod}
                    <br />
                </span>
            )
        })
    );
}