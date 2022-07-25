import React from 'react';
import './NoModulesPopup.css'

export default function NoModulesPopup(props) {
    return(props.trigger) ? 
        <div className="popup">
            <div className="popup-inner">
                { props.children }
                Please add modules before pressing generate!
                <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                <br />
                <br />
                <br />
            </div>
        </div>
    : "";
}