#!/bin/bash -e

pushd test
run_f "npm run build:ios"
run_f "npm run e2e:ios-ci"
popd
