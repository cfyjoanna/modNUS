import React from 'react';
import './Popup.css'

export default function Popup(props) {
    return(props.trigger) ? 
        <div className="popup">
            <div className="popup-inner">
                { props.children }
                Error! No possible timetable! Please choose a different set of modules/settings!
                <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                <br />
                <br />
                <br />
            </div>
        </div>
    : "";
}