import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { Button } from "@mui/material";
import SearchModules from '../components/SearchModules.js';
import TimeTable from '@mikezzb/react-native-timetable';
import { useRef } from 'react';

import Carousel from './Carousel.js';
import TimeSearchBar from './TimeSearchBar.js';
import Popup from '../Popup/Popup.js';
import './TimeTableGenerator.css';

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
    earliestTime: 11,
    latestTime: 19,
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
    earliestTime: 14,
    latestTime: 18,
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
    earliestTime: 8,
    latestTime: 12,
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
    earliestTime: 12,
    latestTime: 15,
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
    earliestTime: 11,
    latestTime: 14,
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
    earliestTime: 14,
    latestTime: 18,
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
    earliestTime: 11,
    latestTime: 14,
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
    earliestTime: 9,
    latestTime: 11,
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
    earliestTime: 16,
    latestTime: 20,
    sections: {
      '': {
        days: [3],
        startTimes: ['16:30'],
        endTimes: ['19:15'],
        locations: ['AS6'],
      },
    },
  },
];



export default function TimetableGenerator() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const moduleTypedRef = useRef();
  
  const [modulesChosen, setModulesChosen] = useState([]);
  
  const [timetables, setTimeTables] = useState(
   [ <TimeTable 
    eventGroups={[]} 
    configs={{
      numOfDays: 5,
    }} />,  ]);

  const startTimeRef = useRef();
  const endTimeRef = useRef();
  let earliestTime = 8;
  let latestTime = 19;

  const handleTimeTables = e => {
    const eventsGroup = modulesChosen.map(mod => {
      const currEvent = allEventGroups.find((option) => option.courseId === mod);
      earliestTime = Math.min(earliestTime, currEvent.earliestTime);
      latestTime = Math.max(latestTime, currEvent.latestTime);
      return currEvent;
    });
    const startTime = isNaN(parseInt(startTimeRef.current.value)) ? 6 : parseInt(startTimeRef.current.value);
    const endTime = isNaN(parseInt(endTimeRef.current.value)) ? 20 : parseInt(endTimeRef.current.value);

    if (startTime >= endTime || (earliestTime < startTime || latestTime > endTime)) {
      setButtonPopup(true);
    } else {
      setTimeTables(events => {
        return [ 
          <TimeTable 
            eventGroups={eventsGroup} 
            configs={{
              numOfDays: 5,
              startHour: startTime,
              endHour: endTime,
            }}
           />];
      })}
      startTimeRef.current.value = null;
      endTimeRef.current.value = null;
      console.log(earliestTime);
    };
  
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
      {/*will fix the css later*/}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <div className='search-modules'>
        <SearchModules 
          refHookForModTyped={moduleTypedRef} 
          modulesChosen={modulesChosen} 
          setModulesChosen={setModulesChosen}  />
        <div class="container" align="right">
          <Button variant="contained" color="primary" onClick={handleTimeTables}>
            Generate
          </Button>
        </div>
        </div>
        <Popup trigger={buttonPopup} setTrigger ={setButtonPopup}> </Popup>
    </>
  );
}