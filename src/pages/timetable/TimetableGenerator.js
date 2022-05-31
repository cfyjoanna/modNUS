import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { Button } from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import SearchModules from '../SearchModules.js';

import Timetable from './Timetable.js';
import Carousel from './Carousel.js';

const Main = styled("div")`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 80vh;
`;

const DropDownContainer = styled("div")`
  width: 10.5em;
  height: 5em;
`;

const DropDownListContainer = styled("div")``;

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

const timetables = [ <Timetable />, <Timetable /> ];

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
              <DropDownListContainer>
                <Box sx={{display: 'flex','& > *': { m: 1,},}}></Box>
                <DropDownList>
                  <ButtonGroup orientation="vertical"
                    aria-label="vertical outlined button group">
                      {filterButtons}
                  </ButtonGroup>
                </DropDownList>
              </DropDownListContainer>
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