import React from "react";
import styled from 'styled-components';

export default function Timeable() {
    const TimetableStyle = styled("div")`
    padding: 0.4em 2em 0.4em 1em;
    font-weight: 300;
    font-size: 1.3rem;
    color: #3faffa;
    background: #ffffff;
    border: 2px solid grey;
    bottom: 100px;
    left: 230px;
    width: 35.5em;
    height: 15em;
`;

    return (
        <TimetableStyle>
              <h2 id="h2" align={"center"}>Timetable</h2>
        </TimetableStyle>
    )
}