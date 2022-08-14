# modNUS

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to Use

To start running, open the terminal and check that you have Node.js by running `node -v`, then run `npm start` to start the application on a local host in your browser.

If the error `Missing script: "start"` appears, make sure you are in the correct directory. (You may have to enter an extra `cd (filename)` in the terminal.)

If the webpack compiles with many `Module not found` errors, try running `npm install`.

## Features

### Timetable Generator

Enter the preferred earliest starting time and latest ending time at the top of the page.

Enter modules into module list at the bottom of the page and click generate to generate a timetable. An error message will be displayed if it is not possible to abide by the start and end times inputted.

### Planner

Note that in the module search bar, only the first 25 suggestions are displayed. This is to prevent lag from the sheer number of modules retrieved from the API.

Enter modules into the plan. Modular credits are automatically awarded upon changing module type.

### Module Reviews

Note that in the module search bar, only the first 25 suggestions are displayed. This is to prevent lag from the sheer number of modules retrieved from the API.

Enter a module name and click on the search icon to find reviews.

You can only submit one review per module. If you submit another review for a module you have already reviewed, your previous review will be replaced by the new one. Past reviews can be found by navigating to the profile (top right icon).

Not every module has reviews as we did not enter example reviews for every module. You can add your own review and try searching for it.

Modules that have example reviews are: CS1010E, CS1101S, CS2040S, GEA1000, GEC1005, and ST2201E.
