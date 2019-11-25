#!/usr/bin/env bash

echo "Running pre-commit hook"
if [ ! -d node_modules ]; then
    npm install
fi

# Prettify the code
npm run pretty

# Run the unit tests
npm run test

# These must pass in order to be able to commit
if [ $? -ne 0 ]; then
 echo "Tests must pass before commit!"
 exit 1
fi
