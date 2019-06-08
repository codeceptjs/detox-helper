#!/bin/bash -e

cd test
npm run build:ios
npm run e2e:ios-ci
