#!/bin/bash -e

cd test
detox build --configuration ios.sim.release
detox test --configuration ios.sim.release --debug-synchronization
