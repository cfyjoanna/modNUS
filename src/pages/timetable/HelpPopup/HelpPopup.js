import React from 'react';
import './HelpPopup.css';
import CloseIcon from '@mui/icons-material/Close';

export default function HelpPopup(props) {
    return(props.trigger) ? 
        <div className="popup">
            <div className="popup-inner">
                { props.children }
                <div className="header">
                    <h1 align="center"> Need help? </h1>
                    <h2> How to use the Timetable Generator </h2>
                    1. Select your preferred start and end times for your timetable
                    <br></br>
                    2. Pick whether you would like to have back-to-back classes or not
                    <br></br>
                    3. Search and add modules using the search bar at the bottom of the page
                    <br></br>
                    4. Press 'Generate'!
                    <br></br>
                    <br></br>
                    <h2> What does the Timetable Generator do? </h2>
                    Our generator helps you generate up to 2 possible timetables according to your preferences!
                </div>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>
                    <CloseIcon></CloseIcon>
                </button>
            </div>
        </div>
    : "";
}