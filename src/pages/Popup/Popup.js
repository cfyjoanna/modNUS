import React from 'react';
import './Popup.css'

export default function Popup(props) {
    return(props.trigger) ? 
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                { props.children }
                Error! Please choose another timing and press generate again!
                <br />
                <br />
                <br />
            </div>
        </div>
    : "";
}