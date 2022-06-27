import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { Button } from "@mui/material";
import SearchModules from '../SearchModules.js';
import TimeTable from '@mikezzb/react-native-timetable';
import { useRef } from 'react';

import Carousel from './Carousel.js';
import TimeSearchBar from './TimeSearchBar.js';
import Popup from '../Popup/Popup.js';

const Main = styled("div")`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 410vh;
  padding: 0;
`;

const allEventGroups = [
  {
    courseId: 'CS1101S',
    title: 'Programming Methodology',
    sections: {
      '- - LEC': {
        days: [2, 3],
        startTimes: ['11:30', '16:30'],
        endTimes: ['12:15', '18:15'],
        locations: ['Online Teaching', 'Online Teaching'],
      },
      '-L01 - LAB': {
        days: [2],
        startTimes: ['16:30'],
        endTimes: ['17:15'],
        locations: ['Online Teaching'],
      },
    },
  },
  {
    courseId: 'CS2040S',
    title: 'Data Structures and Algorithms',
    sections: {
      'A - LEC': {
        days: [1, 3],
        startTimes: ['16:30', '14:30'],
        endTimes: ['17:15', '16:15'],
        locations: ['Online Teaching', 'Online Teaching'],
      },
      'AT02 - TUT': {
        days: [4],
        startTimes: ['17:30'],
        endTimes: ['18:15'],
        locations: ['Online Teaching'],
      },
    },
  },
  {
    courseId: 'GEA1000',
    title: 'Quantitative Reasoning with Data',
    sections: {
      'BEC1 - CLW': {
        days: [2, 4],
        startTimes: ['10:30', '8:30'],
        endTimes: ['11:15', '10:15'],
        locations: ['Online Teaching', 'Online Teaching'],
      },
    },
  },
  {
    courseId: 'ST2201E',
    title: 'Statistics for Engineers',
    sections: {
      'B - LEC': {
        days: [1],
        startTimes: ['12:30'],
        endTimes: ['14:15'],
        locations: ['Online Teaching'],
      },
      'BT01 - TUT': {
        days: [3],
        startTimes: ['12:30'],
        endTimes: ['14:15'],
        locations: ['Online Teaching'],
      },
    },
  },
  {
    courseId: 'GEC1005',
    title: 'Cultural Borrowing: China and Japan',
    sections: {
      '-A01 - ASB': {
        days: [5],
        startTimes: ['11:30'],
        endTimes: ['13:15'],
        locations: ['Online Teaching'],
      },
    },
  },
  {
    courseId: 'DSA1701',
    title: 'Data Exploration',
    sections: {
      '- - LEC': {
        days: [4],
        startTimes: ['14:30'],
        endTimes: ['17:15'],
        locations: ['LT5'],
      },
    },
  },
  {
    courseId: 'GET1685',
    title: 'Drugs and Culture',
    sections: {
      '- - LEC': {
        days: [4],
        startTimes: ['11:30'],
        endTimes: ['13:15'],
        locations: ['UT-LT5'],
      },
    },
  },
  {
    courseId: 'LAJ1201',
    title: 'Japanese 1',
    sections: {
      '': {
        days: [1],
        startTimes: ['9:30'],
        endTimes: ['10:30'],
        locations: ['AS4'],
      },
    },
  },
  {
    courseId: 'LAJ2201',
    title: 'Japanese 2',
    sections: {
      '': {
        days: [6],
        startTimes: ['16:30'],
        endTimes: ['19:15'],
        locations: ['Home'],
      },
    },
  },
];



export default function TimetableGenerator() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const modulesChosenRef = useRef();
  /*
  const [chosenModules, setChosenModules] = useState([]);

  const handleChosenModules = e => {
    const module = modulesChosenRef.current.value;

    setChosenModules(mod => {
      const currMod = allEventGroups.map((option) => option.courseId === module);
      console.log(module);
      return [...mod, currMod];
    })
  }
  */
  const [timetables, setTimeTables] = useState(
   [ <TimeTable 
    eventGroups={[]} 
    configs={{
      numOfDays: 5,
    }} />,  ]);

    const startTimeRef = useRef();
    const endTimeRef = useRef();
    const earliestTime = 8;
    const latestTime = 19;

    const handleTimeTables = e => {
      const startTime = isNaN(parseInt(startTimeRef.current.value)) ? 6 : parseInt(startTimeRef.current.value);
      const endTime = isNaN(parseInt(endTimeRef.current.value)) ? 20 : parseInt(endTimeRef.current.value);
      
      if (startTime >= endTime || (earliestTime < startTime || latestTime > endTime)) {
        setButtonPopup(true);
      } else {
      setTimeTables(events => {
        return [ 
          <TimeTable 
          eventGroups={allEventGroups} 
          configs={{
            numOfDays: 5,
            startHour: startTime,
            endHour: endTime,
          }}
           />];
    })}};
  

  return(
    <>
        <h2 id="h2" align={"center"}>Timetable Generator</h2>
        
        <Main>
        <div className="starttime"> 
          <TimeSearchBar refHook={startTimeRef} label="start time"></TimeSearchBar>
          <TimeSearchBar refHook={endTimeRef} label="end time"></TimeSearchBar>
        </div>
        
          <Carousel images={timetables}/>
        </Main>

        <SearchModules refHook={modulesChosenRef} />
        <div class="container" align="right">
          <Button variant="contained" color="primary" onClick={handleTimeTables}>
            Generate
          </Button>
          {/*<Button variant="contained" color="primary" onClick={handleChosenModules}>Update List</Button>*/}
        </div>
        <Popup trigger={buttonPopup} setTrigger ={setButtonPopup}> </Popup>
    </>
  );
}