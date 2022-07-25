import React from 'react';
import { useState } from 'react';
import { Button } from "@mui/material";
import SearchModules from '../components/SearchModules.js';
import TimeTable from '@mikezzb/react-native-timetable';
import { useRef } from 'react';

import Carousel from './Carousel.js';
import TimeSearchBar from './TimeSearchBar.js';
import Popup from '../Popup/Popup.js';
import './TimeTableGenerator.css';
import { Switch } from "@mui/material";
import NoModulesPopup from '../components/NoModulesPopUp/NoModulesPopUp.js';


const allEventGroups = [
  {
    courseId: 'CS1101S',
    title: 'Programming Methodology',
    earliestTime: 11,
    latestTime: 18,
    sections: {
      '- - LEC 01': {
        days: [2, 3],
        startTimes: ['11:00', '16:30'],
        endTimes: ['12:00', '18:00'],
        locations: ['COM1-SR1', 'COM3-LT17'],
      },
      '-L01 - LAB': {
        days: [2],
        startTimes: ['16:30'],
        endTimes: ['17:30'],
        locations: ['AS6'],
      },
    },
  },
  {
    courseId: 'CS1101S',
    title: 'Programming Methodology',
    earliestTime: 12,
    latestTime: 18,
    sections: {
      '- - LEC 02': {
        days: [2, 3],
        startTimes: ['12:00', '17:00'],
        endTimes: ['13:00', '18:00'],
        locations: ['COM1-SR1', 'COM3-LT17'],
      },
      '-L01 - LAB': {
        days: [2],
        startTimes: ['16:30'],
        endTimes: ['17:30'],
        locations: ['AS6'],
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
        endTimes: ['17:00', '16:00'],
        locations: ['COM1-LT3', 'COM1-LT6'],
      },
      'AT02 - TUT': {
        days: [4],
        startTimes: ['17:30'],
        endTimes: ['18:00'],
        locations: ['COM2-0114'],
      },
    },
  },
  {
    courseId: 'GEA1000',
    title: 'Quantitative Reasoning with Data',
    earliestTime: 8,
    latestTime: 11,
    sections: {
      'BEC1 - CLW': {
        days: [2, 4],
        startTimes: ['10:30', '8:30'],
        endTimes: ['11:00', '10:00'],
        locations: ['UT-SR2', 'Global Learning Room'],
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
        endTimes: ['14:30'],
        locations: ['AS3-LT8'],
      },
      'BT01 - TUT': {
        days: [3],
        startTimes: ['12:30'],
        endTimes: ['14:00'],
        locations: ['E4-04-02'],
      },
    },
  },
  {
    courseId: 'GEC1005',
    title: 'Cultural Borrowing: Korea and Japan',
    earliestTime: 11,
    latestTime: 13,
    sections: {
      '-A01 - ASB': {
        days: [5],
        startTimes: ['11:30'],
        endTimes: ['13:00'],
        locations: ['AS5-0218'],
      },
    },
  },
  {
    courseId: 'DSA1701',
    title: 'Data Exploration',
    earliestTime: 14,
    latestTime: 16,
    sections: {
      '- - LEC': {
        days: [4],
        startTimes: ['14:00'],
        endTimes: ['16:00'],
        locations: ['LT5'],
      },
    },
  },
  {
    courseId: 'GET1685',
    title: 'Drugs and Culture',
    earliestTime: 11,
    latestTime: 13,
    sections: {
      '- - LEC': {
        days: [4],
        startTimes: ['11:30'],
        endTimes: ['13:00'],
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
    earliestTime: 8,
    latestTime: 10,
    sections: {
      '- - LG01': {
        days: [3],
        startTimes: ['08:00'],
        endTimes: ['10:00'],
        locations: ['AS6'],
      },
    },
  },
  {
    courseId: 'LAJ2201',
    title: 'Japanese 2',
    earliestTime: 10,
    latestTime: 12,
    sections: {
      '- - LG02': {
        days: [3],
        startTimes: ['10:00'],
        endTimes: ['12:00'],
        locations: ['AS6'],
      },
    },
  },
];



export default function TimetableGenerator() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [noModsPopup, setNoModsPopup] = useState(false);
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
  let possibleTimetable = true;

  const handleTimeTables = e => {
    let earliestTime = 20;
    let latestTime = 8;
    const startTime = isNaN(parseInt(startTimeRef.current.value)) ? 6 : parseInt(startTimeRef.current.value);
    const endTime = isNaN(parseInt(endTimeRef.current.value)) ? 20 : parseInt(endTimeRef.current.value);
    var weekTimings = [];
    
    if (modulesChosen.length === 0) {
      setNoModsPopup(true);
    }
    const eventsGroup = modulesChosen.map(mod => {
      const testbtb = e => {
        let backtoback = false;
        Object.entries(e.sections).forEach(([k, v]) => {
          (v.days || []).forEach((day, i) => {
            const [sHour, sMinute] = v.startTimes[i].split(':');
            const [eHour, eMinute] = v.endTimes[i].split(':');
            const sTime = +sHour + +sMinute / 60;
            const eTime = +eHour + +eMinute / 60;
            if (typeof(weekTimings.find((arr) => arr[0] === day && ((arr[1] === sTime || arr[2] === sTime) || (arr[1] !== eTime || arr[2] !== eTime)))) !== 'undefined') {
              console.log(sTime)
              console.log(weekTimings);
              backtoback = true;
            }
          })
        })
        console.log("testbtb")
        console.log(backtoback)
        return backtoback;
      };
    const currEvent = allEventGroups.find((option) => 
        option.courseId === mod 
            && ((startTime <= option.earliestTime && endTime >= option.latestTime) && (btbchecked || !testbtb(option)))
      );
      console.log(currEvent);
      if (typeof(currEvent) === 'undefined') {
        setButtonPopup(true);
        possibleTimetable = false;
        return {};
      } else {
        earliestTime = Math.min(earliestTime, currEvent.earliestTime);
        latestTime = Math.max(latestTime, currEvent.latestTime);
        Object.entries(currEvent.sections).forEach(([k, v]) => {
          (v.days || []).forEach((day, i) => {
            const [sHour, sMinute] = v.startTimes[i].split(':');
            const [eHour, eMinute] = v.endTimes[i].split(':');
            const sTime = +sHour + +sMinute / 60;
            const eTime = +eHour + +eMinute / 60;
            weekTimings.push([day, sTime, eTime]);
          })
        })
        return currEvent;
      }
    });
    
    if (!btbchecked) {
      weekTimings.sort();
      console.log("sorted");
      console.log(weekTimings);
    }
    if ((startTime >= endTime || (earliestTime < startTime || latestTime > endTime))) {
      setButtonPopup(true);
      possibleTimetable = false;
    } else {
      setTimeTables(events => {
        return [ 
          <TimeTable 
            eventGroups={possibleTimetable ? eventsGroup : []} 
            configs={{
              numOfDays: 5,
              startHour: startTime,
              endHour: endTime,
            }}
           />];
      })}
      startTimeRef.current.value = null;
      endTimeRef.current.value = null;
    };

    const [btbchecked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  
  
  return(
    <>
      <h2 id="h2" align={"center"}>Timetable Generator</h2>
        
      
      <div className="start-time"> 
          <TimeSearchBar refHook={startTimeRef} label="start time"></TimeSearchBar>
          <TimeSearchBar refHook={endTimeRef} label="end time"></TimeSearchBar>
            Allow Back-to-Back classes <Switch 
            checked={btbchecked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          /> 
      </div>
      
      <div className='generator-block'>
        <Carousel images={timetables}/>
      </div>

  
      <div className='search-modules'>
        <SearchModules 
          refHookForModTyped={moduleTypedRef} 
          modulesChosen={modulesChosen} 
          setModulesChosen={setModulesChosen}  />
      </div>
      <div className="generate-button" align="right">
        <Button variant="contained" color="primary" onClick={handleTimeTables}>
           Generate
         </Button>
       </div>
       
        <NoModulesPopup trigger={noModsPopup} setTrigger={setNoModsPopup}></NoModulesPopup>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}> </Popup>
    </>
  );
}