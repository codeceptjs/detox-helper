#!/bin/bash -e

source $(dirname "$0")/ci.sh

pushd test
run_f "npm run build:ios"
run_f "npm run e2e:ios-ci"
popd
