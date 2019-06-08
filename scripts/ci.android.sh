#!/bin/bash -e

# Approve unapproved SDK licenses
#  yes | $ANDROID_HOME/tools/bin/sdkmanager 

cd test
# Workaround until react android issue will be fixed - react-native: 0.55
# mv node_modules/react-native/ReactAndroid/release.gradle node_modules/react-native/ReactAndroid/release.gradle.bak
# cp extras/release.gradle node_modules/react-native/ReactAndroid/

npm run build:android
npm run e2e:android-ci

