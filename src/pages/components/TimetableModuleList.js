import React from 'react';

export default function TimetableModuleList({ mods }) {
  let counter = 0;
  let mcs = 0;
  
  return([
    mods.map(mod => {
      counter = counter + 1;
      const currMod = modules.find(obj => obj.courseId === mod);
      if (typeof(currMod) === 'undefined') {
        return "";
      } else {
        mcs += currMod.credits;
        return (
        <div className="module-box" key={mod}>
          {counter}. {mod} {currMod.title}, {currMod.credits} MCs
        </div> );
      }
    })
    ,<div className= "total-mcs"> 
      Total MCs: {mcs}
    </div> 
  ]);
}

const modules = [
  {
    courseId: 'CS1101S',
    title: 'Programming Methodology',
    credits: 4,
    sections: {
      '- - LEC 01': {
        days: [2, 3],
        startTimes: ['11:00', '16:30'],
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
    credits: 4,
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
    credits: 4,
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
    credits: 4,
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
    credits: 4,
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
    credits: 4,
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
    credits: 4,
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
    credits: 4,
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
    credits: 4,
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
