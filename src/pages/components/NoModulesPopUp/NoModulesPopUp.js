import React from 'react';
import './NoModulesPopup.css'
import CloseIcon from '@mui/icons-material/Close';

export default function NoModulesPopup(props) {
    return(props.trigger) ? 
        <div className="popup">
            <div className="popup-inner">
                { props.children }
                <h2>Please add modules before pressing generate!</h2>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>
                    <CloseIcon></CloseIcon>
                </button>
                <br />
                <br />
                <br />
            </div>
        </div>
    : "";
}