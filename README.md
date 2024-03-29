# Bounce Balls

A demo bouncing ball application.

## Introduction
We have a chart in which the user can click and launch balls. Two models
are implemented - linear and gravity - and the user can toggle between them
by pressing the 'Change Model' button. The colour of the balls can be cycled
by pressing the 'Change Colour' button. The initial maximum speed of the balls
can be changed by moving the 'Initial Maximum Speed' slider (right is faster,
left is slower).

This project uses npm and the following scripts are defined:<br>
- deploy: deploy the app (uglifying it) to the ./bin directory<br>
- clean: remove the uglified files from the ./bin directory, the node_modules directory and the package-lock.json file<br>
- test: run the unit tests in ./test
- pretty: prettify the code
- git-hooks: install the git pre-commit hook to prettify and test the code before commit

## Installing and running
Make sure npm is installed.<br>
Run 'npm install' to install the required Node.js modules<br>
Run 'npm run deploy' to create the uglified files in ./bin<br>
Point your browser at the bounce-balls.html file<br>
You may need to disable CORS if using file:/// URLs. Notes on how to do this
are below.

Alternatively, the application can be run from the source directory without uglifying
it or running the unit tests by loading the bounce-balls-src.html file.

## Layout
./bin: the directory where the uglified files are installed

./src: the actual source code<br>
  - main.js - the main entry point from the browser<br>
  - bounce-balls.js - the Ball class, utilities and physics models module

./test: the unit test directory. This uses jest.
  - bounce-balls.test.js - the unit test file

./scripts: the git scripts directory.
  - install-hooks.sh - bash script to install the git pre-comit hook<br>
  - pre-commit.sh - the git pre-commit hook

## Unit tests
The unit tests are not a comprehensive suite of tests. I have only implemented
two tests, one to check state and the other to check mocked function calling.
The tests are merely to show how they could be set up for a complete test suite.

## Disabling CORS
To disable CORS using file:///

For Firefox:<br>
    Type about:config into the navigation bar, then set security.fileuri.strict_origin_policy = false

