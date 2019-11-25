# Bounce Balls

A demo bouncing ball application.

## Introduction
We have a chart in which the user can click and launch balls. Two models
are implemented - linear and gravity - and the user can toggle between them
by pressing the 'Change Model' button. The colour of the balls can be cycled
by pressing the 'Change Colour' button.

This project uses npm and the following scripts are defined:
- deploy: deploy the app (uglifying it) to the ./bin directory
- clean: remve the uglified files from the ./bin directory
- test: run the unit tests in ./test

## Installing and running
Make sure npm is installed.
Run 'npm install' to install the required Node modules
Run 'npm run deploy' to create the uglified files in ./bin
Point your browser at the bounce-balls.html file
You may need to disable CORS if using file:/// URLs. Notes on how to do this
are below.

Alternatively, the application can be run from the source directory without uglifying
it or running the unit tests by loading the bounce-balls-src.html file.

## Layout
./bin: the directory where the uglified files are and where the demo may be run from
./src: the actual source code
  main.js - the main entry point from the browser
  bounce-balls.js - the Ball class and physics models module
./test: the unt test directory. This uses jest.

## Unit tests
The unit tests are not a comprehensive suite of tests. I have only implemented
two tests, one to check state and the other to check mocked function calling.
The tests are merly to show how they could be set up for a complete test suite.

## Disabling CORS
To disable CORS using file:///

For Firefox:
    Type about:config into the navigation bar, then set security.fileuri.strict_origin_policy = false

For Chrome, use the command line option:
  > Chrome.exe --disable-web-security  (Windows)
  > chrome --disable-web-security (Linux)
-->

