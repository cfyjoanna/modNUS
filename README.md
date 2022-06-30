# modNUS

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to Use

To start running, open the terminal and check that you have Node.js by running `node -v`, then run `npm start` to start the application on a local host in your browser.

If the error `Missing script: "start"` appears, make sure you are in the correct directory. (You may have to enter an extra `cd modnus-master` in the terminal.) If not, try running `npm install react-scripts --save`.

## Features

### Timetable Generator

Enter the preferred earliest starting time and latest ending time at the top of the page.

Enter modules into module list at the bottom of the page and click generate to generate a timetable. An error message will be displayed if it is not possible to abide by the start and end times inputted.

### Planner

Enter modules into the plan. Modular credits are automatically awarded upon changing module type.

There may be a visible re-render when adding modules. This is a known issue and will be fixed.

### Module Reviews

Enter a module name and click on the search icon to find reviews.
