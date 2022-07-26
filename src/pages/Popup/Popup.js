import React from 'react';
import './Popup.css'
import CloseIcon from '@mui/icons-material/Close';

export default function Popup(props) {
    return(props.trigger) ? 
        <div className="popup">
            <div className="popup-inner">
                { props.children }
                <h2 align="center">No possible timetable! Please choose a different set of modules/settings! </h2>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>
                    <CloseIcon></CloseIcon>
                </button>
            </div>
        </div>
    : "";
}