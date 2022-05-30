import React from 'react';
import './AddReview.css'
import TextField from '@material-ui/core/TextField'

export default function AddReview(props) {
    return(props.trigger) ? 
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                { props.children }
                <TextField label="Module name">
                </TextField>
                <br />
                <TextField label="Your review">
                </TextField>
                <br />
                <button className="submit-btn" onClick={() => props.setTrigger(false)}>Submit</button>
            </div>
        </div>
    : "";
}