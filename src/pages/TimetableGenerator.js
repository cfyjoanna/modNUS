import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { Button } from "@material-ui/core";
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchModules from './SearchModules.js'


const Main = styled("div")`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 70vh;
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


const Timetable = styled("div")`
  position: absolute;
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

const filterButtons = [
  <Button key="one">Filter 1</Button>,
  <Button key="two">Filter 2</Button>,
  <Button key="three">Filter 3</Button>,
];


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
         <Timetable>
              <h2 id="h2" align={"center"}>Timetable</h2>
        </Timetable>
        <div class="row">
          <div class="left-col" align="left">
            <IconButton aria-label="Example">
              <ArrowBackIosNewIcon fontSize="large"/>
            </IconButton>
          </div>
          <div class="right-col" align="right">
            <IconButton aria-label="Example">
              <ArrowForwardIosIcon fontSize="large"/>
            </IconButton>
          </div>
        </div>
        </Main>
        <SearchModules></SearchModules>
        <div class="container" align="right">
          <Button variant="contained" color="primary">
          Generate
          </Button>
        </div>
    </>
  );
}