import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { Button, Input } from "@mui/material";
import SearchModules from '../SearchModules.js';
import TimeTable from '@mikezzb/react-native-timetable';
import TextField from '@mui/material/TextField';

import Carousel from './Carousel.js';

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
        locations: ['Lady Shaw Bldg LT5'],
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
        locations: ['Lee Shau Kee Building LT5'],
      },
    },
  },
  {
    courseId: 'LAJ1201',
    title: 'Japanese 1',
    sections: {
      '': {
        days: [7],
        startTimes: ['12:30'],
        endTimes: ['13:15'],
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
  //const [eventGroups, setEventGroups] = useState(allEventGroups);
  // console.log(eventGroups)
  
  const [timetables, setTimeTables] = useState(
   [ <TimeTable 
    eventGroups={[]} 
    configs={{
      numOfDays: 5,
    }} />, <TimeTable 
     events={[
      {
        courseId: 'CSCI2100',
        title: 'Data Structures',
        section: 'A - LEC',
        day: 3,
        startTime: '14:30',
        endTime: '16:15',
        location: 'Online Teaching',
        color: 'rgba(241,153,40,1)',
      },]} 
      configs={{
          numOfDays: 5,
        }} /> ]);

    const handleTimeTables = e => {
      setTimeTables(events => {
        return [ 
          <TimeTable 
          eventGroups={allEventGroups} 
           />];
    })};
    

  return(
    <>
        <h2 id="h2" align={"center"}>Timetable Generator</h2>

        <Main>
        <div className="starttime">
          Start Time: 
          <TextField label="e.g 7 for 7am"> </TextField>
          End Time:
          <TextField label="e.g 20 for 8pm"> </TextField>
        </div>
        
          <Carousel images={timetables}/>
        </Main>

        <SearchModules />
        <div class="container" align="right">
          <Button variant="contained" color="primary" onClick={handleTimeTables}>
            Generate
          </Button>
        </div>
        
    </>
  );
}