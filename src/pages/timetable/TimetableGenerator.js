import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { Button } from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';
import SearchModules from '../SearchModules.js';
import TimeTable from '@mikezzb/react-native-timetable';

import Carousel from './Carousel.js';

const Main = styled("div")`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 410vh;
`;

const DropDownContainer = styled("div")`
  width: 10.5em;
  height: 5em;
`;


const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0em;
  }
`;

const filterButtons = [
  <Button key="one">Filter 1</Button>,
  <Button key="two">Filter 2</Button>,
  <Button key="three">Filter 3</Button>,
];

const eventGroups = [
  {
    courseId: 'AIST3020',
    title: 'Intro to Computer Systems',
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
    courseId: 'CSCI2100',
    title: 'Data Structures',
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
    courseId: 'ELTU2014',
    title: 'English for ERG Stds I',
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
    courseId: 'ENGG2780',
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
    courseId: 'GESC1000',
    title: 'College Assembly',
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
    courseId: 'UGEB1492',
    title: 'Data Expl - Stat in Daily Life',
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
    courseId: 'UGEC1685',
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
    courseId: 'Eat!',
    title: 'No work on SUNDAY!',
    sections: {
      '': {
        days: [7],
        startTimes: ['12:30'],
        endTimes: ['13:15'],
        locations: ['Home'],
      },
    },
  },
  {
    courseId: 'Manga!',
    title: '',
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

const timetables = [ <TimeTable eventGroups={eventGroups} 
   />, <TimeTable events={[
    {
      courseId: 'CSCI2100',
      title: 'Data Structures',
      section: 'A - LEC',
      day: 3,
      startTime: '14:30',
      endTime: '16:15',
      location: 'Online Teaching',
      color: 'rgba(241,153,40,1)',
    },]} numOfDays={5} /> ];

export default function TimetableGenerator() {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  return(
    <>
        <h2 id="h2" align={"center"}>Timetable Generator</h2>

        <Main>
          <DropDownContainer>
            <Button variant="outlined" onClick={toggling}>Filter by</Button>
            {isOpen && (
                <DropDownList>
                  <ButtonGroup orientation="vertical"
                    aria-label="vertical outlined button group">
                      {filterButtons}
                  </ButtonGroup>
                </DropDownList>
            )}
          </DropDownContainer>
        
          <Carousel images={timetables}/>
        </Main>

        <SearchModules />
        <div class="container" align="right">
          <Button variant="contained" color="primary">
            Generate
          </Button>
        </div>
    </>
  );
}