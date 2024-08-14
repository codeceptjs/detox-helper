[![Publish npm Package](https://github.com/codeceptjs/detox-helper/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/codeceptjs/detox-helper/actions/workflows/npm-publish.yml) [![e2e-android](https://github.com/codeceptjs/detox-helper/actions/workflows/e2e-android.yml/badge.svg)](https://github.com/codeceptjs/detox-helper/actions/workflows/e2e-android.yml) [![e2e-ios](https://github.com/codeceptjs/detox-helper/actions/workflows/e2e-ios.yml/badge.svg)](https://github.com/codeceptjs/detox-helper/actions/workflows/e2e-ios.yml)

# [Detox](https://github.com/wix/Detox) Helper for [CodeceptJS](https://codecept.io)

Testing Mobile Apps on iOS and Android can look like this:

```js
I.setLandscapeOrientation();
I.fillField('#text', 'a new text');
I.see('a new text', '#textValue');
I.dontSeeElement('#createdAndVisibleText');
I.click({ ios: '#GoButton', android: 'Button' });
I.waitForElement('#createdAndVisibleText', 20);
I.seeElement('#createdAndVisibleText');
I.runOnAndroid(() => {
  I.click('Save');
  I.see('Text Saved', '#message');
});
I.runOnIOS(() => {
  I.click('SAVE');
  I.see('SAVED!');
});
```

Example output:

```bash
creating output directory: /Users/runner/work/detox-helper/detox-helper/test/output
***************************************
nodeInfo:  20.14.0
osInfo:  macOS 14.5
cpuInfo:  (3) arm64 Apple M1 (Virtual)
chromeInfo:  125.0.6422.142
edgeInfo:  Not Found
firefoxInfo:  undefined
safariInfo:  17.5
If you need more detailed info, just run this: npx codeceptjs info
***************************************
CodeceptJS v3.6.3 #StandWithUkraine
Using test root "/Users/runner/work/detox-helper/detox-helper/test"
Helpers: Detox, ExpectHelper
Plugins: screenshotOnFail

    Acceptance Tests --
        [1]  Starting recording promises
        Timeouts: 
    11:44:06.770 detox[8813] i   App started
    11:44:28.445 detox[8813] i com.wix.demo.react.native launched. To watch simulator logs, run:
            /usr/bin/xcrun simctl spawn F44382C2-F0BE-466A-9683-AA6B37591FBA log stream --level debug --style compact --predicate 'process == "example"'
    11:44:28.557 detox[8813] i     --- STARTED "before each" hook: Before for "App started" ---
    11:44:28.583 detox[8813] i     I launch app 
    11:44:30.037 detox[8813] i com.wix.demo.react.native launched. To watch simulator logs, run:
            /usr/bin/xcrun simctl spawn F44382C2-F0BE-466A-9683-AA6B37591FBA log stream --level debug --style compact --predicate 'process == "example"'
    11:44:30.043 detox[8813] i     I wait for element visible "#hello_button", 15
    11:44:31.253 detox[8813] i     --- ENDED "before each" hook: Before for "App started" ---
    11:44:31.273 detox[8813] i     I see "Welcome"
    11:44:31.289 detox[8813] i   ✔ OK in 25ms
    11:44:31.289 detox[8813] i 
    11:44:31.301 detox[8813] i   Get platform
    11:44:34.736 detox[8813] i com.wix.demo.react.native launched. To watch simulator logs, run:
            /usr/bin/xcrun simctl spawn F44382C2-F0BE-466A-9683-AA6B37591FBA log stream --level debug --style compact --predicate 'process == "example"'
    11:44:40.582 detox[8813] i     --- STARTED "before each" hook: Before for "Get platform" ---
    11:44:40.588 detox[8813] i     I launch app 
    11:44:42.271 detox[8813] i com.wix.demo.react.native launched. To watch simulator logs, run:
            /usr/bin/xcrun simctl spawn F44382C2-F0BE-466A-9683-AA6B37591FBA log stream --level debug --style compact --predicate 'process == "example"'
    11:44:42.274 detox[8813] i     I wait for element visible "#hello_button", 15
    11:44:43.126 detox[8813] i     --- ENDED "before each" hook: Before for "Get platform" ---
    11:44:43.150 detox[8813] i     I grab platform 
    11:44:43.152 detox[8813] i     I expect ""ios"" to equal ""ios""
    11:44:43.158 detox[8813] i   ✔ OK in 31ms
    11:44:43.158 detox[8813] i 
    11:44:43.166 detox[8813] i   Show hello screen after tap
    11:44:46.251 detox[8813] i com.wix.demo.react.native launched. To watch simulator logs, run:
            /usr/bin/xcrun simctl spawn F44382C2-F0BE-466A-9683-AA6B37591FBA log stream --level debug --style compact --predicate 'process == "example"'
    11:44:52.308 detox[8813] i     --- STARTED "before each" hook: Before for "Show hello screen after tap" ---
    11:44:52.321 detox[8813] i     I launch app 
    11:47:22.243 detox[8813] i com.wix.demo.react.native launched. To watch simulator logs, run:
            /usr/bin/xcrun simctl spawn F44382C2-F0BE-466A-9683-AA6B37591FBA log stream --level debug --style compact --predicate 'process == "example"'
    11:47:22.319 detox[8813] i     I wait for element visible "#hello_button", 15
    11:47:23.637 detox[8813] i     --- ENDED "before each" hook: Before for "Show hello screen after tap" ---
    11:47:23.668 detox[8813] i     I dont see "Hello!!!"
    11:47:23.699 detox[8813] i     I click "#hello_button"
    11:47:24.308 detox[8813] i     I see "Hello!!!"
    11:47:24.323 detox[8813] i   ✔ OK in 684ms
    11:47:24.323 detox[8813] i 
    11:47:24.334 detox[8813] i   Show world screen after tap
    11:47:27.298 detox[8813] i com.wix.demo.react.native launched. To watch simulator logs, run:
            /usr/bin/xcrun simctl spawn F44382C2-F0BE-466A-9683-AA6B37591FBA log stream --level debug --style compact --predicate 'process == "example"'
    11:47:33.604 detox[8813] i     --- STARTED "before each" hook: Before for "Show world screen after tap" ---
    11:47:33.608 detox[8813] i     I launch app 
    11:47:36.074 detox[8813] i com.wix.demo.react.native launched. To watch simulator logs, run:
            /usr/bin/xcrun simctl spawn F44382C2-F0BE-466A-9683-AA6B37591FBA log stream --level debug --style compact --predicate 'process == "example"'
    11:47:36.110 detox[8813] i     I wait for element visible "#hello_button", 15
    11:47:36.450 detox[8813] i     --- ENDED "before each" hook: Before for "Show world screen after tap" ---
    11:47:36.452 detox[8813] i     I click "#world_button"
    11:47:37.314 detox[8813] i     I see "World!!!"
    11:47:37.408 detox[8813] i   ✔ OK in 935ms
    11:47:37.409 detox[8813] i 
    11:47:37.468 detox[8813] i 
    11:47:37.470 detox[8813] i   OK  | 4 passed   // 7m
```

CodeceptJS provides next features over standard Detox:

-   **Unified API**. The same test can be executed in Appium or Detox. Unified API helps different teams to use the same syntax and easy port tests from one engine to another.
-   **Interactive pause**. When starting/stopping an application takes a long time, debugging and writing tests can be hard. 
    CodeceptJS solves this by pausing an execution and letting you try different commands and locators. With this feature a test can be writtern during one running session.
-   **One Test For Android and IOS**. When application differs on Android and IOS you can provide corresponding system-related locators for both systems. When needed a different code can be executed for Android and IOS keeping it inside the same test.

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [Detox](#detox)
    -   [Setup](#setup)
    -   [Configuration](#configuration)
    -   [Parameters](#parameters)
    -   [saveScreenshot](#savescreenshot)
        -   [Parameters](#parameters-1)
    -   [relaunchApp](#relaunchapp)
    -   [launchApp](#launchapp)
    -   [installApp](#installapp)
    -   [shakeDevice](#shakedevice)
    -   [goBack](#goback)
    -   [setLandscapeOrientation](#setlandscapeorientation)
    -   [setPortraitOrientation](#setportraitorientation)
    -   [grabPlatform](#grabplatform)
    -   [runOnIOS](#runonios)
        -   [Parameters](#parameters-2)
    -   [runOnAndroid](#runonandroid)
        -   [Parameters](#parameters-3)
    -   [tap](#tap)
        -   [Parameters](#parameters-4)
    -   [multiTap](#multitap)
        -   [Parameters](#parameters-5)
    -   [longPress](#longpress)
        -   [Parameters](#parameters-6)
    -   [click](#click)
        -   [Parameters](#parameters-7)
    -   [tapByLabel](#tapbylabel)
        -   [Parameters](#parameters-8)
    -   [clickAtPoint](#clickatpoint)
        -   [Parameters](#parameters-9)
    -   [see](#see)
        -   [Parameters](#parameters-10)
    -   [dontSee](#dontsee)
        -   [Parameters](#parameters-11)
    -   [seeElement](#seeelement)
        -   [Parameters](#parameters-12)
    -   [checkIfElementExists](#checkifelementexists)
        -   [Parameters](#parameters-13)
    -   [dontSeeElement](#dontseeelement)
        -   [Parameters](#parameters-14)
    -   [seeElementExists](#seeelementexists)
        -   [Parameters](#parameters-15)
    -   [dontSeeElementExists](#dontseeelementexists)
        -   [Parameters](#parameters-16)
    -   [fillField](#fillfield)
        -   [Parameters](#parameters-17)
    -   [tapReturnKey](#tapreturnkey)
        -   [Parameters](#parameters-18)
    -   [clearField](#clearfield)
        -   [Parameters](#parameters-19)
    -   [appendField](#appendfield)
        -   [Parameters](#parameters-20)
    -   [scrollUp](#scrollup)
        -   [Parameters](#parameters-21)
    -   [scrollDown](#scrolldown)
        -   [Parameters](#parameters-22)
    -   [scrollLeft](#scrollleft)
        -   [Parameters](#parameters-23)
    -   [scrollRight](#scrollright)
        -   [Parameters](#parameters-24)
    -   [swipeUp](#swipeup)
        -   [Parameters](#parameters-25)
    -   [swipeDown](#swipedown)
        -   [Parameters](#parameters-26)
    -   [swipeLeft](#swipeleft)
        -   [Parameters](#parameters-27)
    -   [swipeRight](#swiperight)
        -   [Parameters](#parameters-28)
    -   [wait](#wait)
        -   [Parameters](#parameters-29)
    -   [waitForElement](#waitforelement)
        -   [Parameters](#parameters-30)
    -   [waitForElementVisible](#waitforelementvisible)
        -   [Parameters](#parameters-31)
    -   [waitToHide](#waittohide)
        -   [Parameters](#parameters-32)
    -   [scrollToElement](#scrolltoelement)
        -   [Parameters](#parameters-33)

### Detox

**Extends Helper**

This is a wrapper on top of [Detox](https://github.com/wix/Detox) library, aimied to unify testing experience for CodeceptJS framework.
Detox provides a grey box testing for mobile applications, playing especially good for React Native apps.

Detox plays quite differently from Appium. To establish detox testing you need to build a mobile application in a special way to inject Detox code.
This why **Detox is grey box testing** solution, so you need access to application source code, and a way to build and execute it on emulator.

Comparing to Appium, Detox runs faster and more stable but requires an additional setup for build.

#### Setup

1.  [Install and configure Detox](https://wix.github.io/Detox/docs/introduction/project-setup)
2.  [Build an application](https://wix.github.io/Detox/docs/introduction/project-setup#step-5-build-the-app) using `detox build` command.
3.  Install [CodeceptJS](https://codecept.io) and detox-helper:


    npm i @codeceptjs/detox-helper --save

Detox configuration is required in `package.json` under `detox` section.

If you completed step 1 and step 2 you should have a configuration similar this:

```js
 "detox": {
    "configurations": {
      "ios.sim.debug": {
        "device": "simulator",
        "app": "ios.debug"
      }
    },
    "apps": {
      "ios.debug": {
        "type": "ios.app",
        "binaryPath": "../test/ios/build/Build/Products/Debug-iphonesimulator/MyTestApp.app",
        "build": "xcodebuild -workspace ../test/ios/MyTestApp.xcworkspace -scheme MyTestApp -configuration Debug -sdk iphonesimulator -derivedDataPath ../test/ios/build"
      }
    },
    "devices": {
      "simulator": {
        "type": "ios.simulator",
        "device": {
          "type": "iPhone 15"
        }
      }
    }
  }
```

#### Configuration

Besides Detox configuration, CodeceptJS should also be configured to use Detox.

In `codecept.conf.js` enable Detox helper:

```js
helpers: {
   Detox: {
     require: '@codeceptjs/detox-helper',
     configuration: '<detox-configuration-name>',
   }
}
```

It's important to specify a package name under `require` section and current detox configuration taken from `package.json`.

Options:

-   `configuration` - a detox configuration name. Required.
-   `reloadReactNative` - should be enabled for React Native applications.
-   `reuse` - reuse application for tests. By default, Detox reinstalls and relaunches app.
-   `registerGlobals` - (default: true) Register Detox helper functions `by`, `element`, `expect`, `waitFor` globally.
-   `url` - URL to open via deep-link each time the app is launched (android) or immediately afterwards (iOS). Useful for opening a bundle URL at the beginning of tests when working with Expo.

#### Parameters

-   `config`  

#### saveScreenshot

Saves a screenshot to the output dir

```js
I.saveScreenshot('main-window.png');
```

##### Parameters

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

#### relaunchApp

Relaunches an application.

```js
I.relaunchApp();
```

#### launchApp

Launches an application. If application instance already exists, use [relaunchApp](#relaunchApp).

```js
I.launchApp();
```

#### installApp

Installs a configured application.
Application is installed by default.

```js
I.installApp();
```

#### shakeDevice

Shakes the device.

```js
I.shakeDevice();
```

#### goBack

Goes back on Android

```js
I.goBack(); // on Android only
```

#### setLandscapeOrientation

Switches device to landscape orientation

```js
I.setLandscapeOrientation();
```

#### setPortraitOrientation

Switches device to portrait orientation

```js
I.setPortraitOrientation();
```

#### grabPlatform

Grab the device platform

```js
const platform = await I.grabPlatform();
```

#### runOnIOS

Execute code only on iOS

```js
I.runOnIOS(() => {
   I.click('Button');
   I.see('Hi, IOS');
});
```

##### Parameters

-   `fn` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** a function which will be executed on iOS

#### runOnAndroid

Execute code only on Android

```js
I.runOnAndroid(() => {
   I.click('Button');
   I.see('Hi, Android');
});
```

##### Parameters

-   `fn` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** a function which will be executed on android

#### tap

Taps on an element.
Element can be located by its text or id or accessibility id.

The second parameter is a context element to narrow the search.

Same as [click](#click)

```js
I.tap('Login'); // locate by text
I.tap('~nav-1'); // locate by accessibility label
I.tap('#user'); // locate by id
I.tap('Login', '#nav'); // locate by text inside #nav
I.tap({ ios: 'Save', android: 'SAVE' }, '#main'); // different texts on iOS and Android
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** 
-   `context` **(CodeceptJS.LocatorOrString | null)**  (optional, default `null`)

#### multiTap

Multi taps on an element.
Element can be located by its text or id or accessibility id.

Set the number of taps in second argument.
Optionally define the context element by third argument.

```js
I.multiTap('Login', 2); // locate by text
I.multiTap('~nav', 2); // locate by accessibility label
I.multiTap('#user', 2); // locate by id
I.multiTap('Update', 2, '#menu'); // locate by id
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** element to locate
-   `num` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** number of taps
-   `context` **(CodeceptJS.LocatorOrString | null)** context element (optional, default `null`)

#### longPress

Taps an element and holds for a requested time.

```js
I.longPress('Login', 2); // locate by text, hold for 2 seconds
I.longPress('~nav', 1); // locate by accessibility label, hold for second
I.longPress('Update', 2, '#menu'); // locate by text inside #menu, hold for 2 seconds
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** element to locate
-   `sec` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** number of seconds to hold tap
-   `context` **(CodeceptJS.LocatorOrString | null)** context element (optional, default `null`)

#### click

Clicks on an element.
Element can be located by its text or id or accessibility id

The second parameter is a context (id | type | accessibility id) to narrow the search.

Same as [tap](#tap)

```js
I.click('Login'); // locate by text
I.click('~nav-1'); // locate by accessibility label
I.click('#user'); // locate by id
I.click('Login', '#nav'); // locate by text inside #nav
I.click({ ios: 'Save', android: 'SAVE' }, '#main'); // different texts on iOS and Android
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** 
-   `context` **(CodeceptJS.LocatorOrString | null)**  (optional, default `null`)

#### tapByLabel

Clicks on an element.
Element can be located by its label

The second parameter is a context (id | type | accessibility id) to narrow the search.

```js
I.tapByLabel('Login'); // locate by text
I.tapByLabel('Login', '#nav'); // locate by text inside #nav
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** 
-   `context` **(CodeceptJS.LocatorOrString | null)**  (optional, default `null`)

#### clickAtPoint

Performs click on element with horizontal and vertical offset.
An element is located by text, id, accessibility id.

```js
I.clickAtPoint('Save', 10, 10);
I.clickAtPoint('~save', 10, 10); // locate by accessibility id
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** 
-   `x` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** horizontal offset (optional, default `0`)
-   `y` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** vertical offset (optional, default `0`)

#### see

Checks text to be visible.
Use second parameter to narrow down the search.

```js
I.see('Record created');
I.see('Record updated', '#message');
I.see('Record deleted', '~message');
```

##### Parameters

-   `text` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** to check visibility
-   `context` **(CodeceptJS.LocatorOrString | null)** element inside which to search for text (optional, default `null`)

#### dontSee

Checks text not to be visible.
Use second parameter to narrow down the search.

```js
I.dontSee('Record created');
I.dontSee('Record updated', '#message');
I.dontSee('Record deleted', '~message');
```

##### Parameters

-   `text` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** to check invisibility
-   `context` **(CodeceptJS.LocatorOrString | null)** element in which to search for text (optional, default `null`)

#### seeElement

Checks for visibility of an element.
Use second parameter to narrow down the search.

```js
I.seeElement('~edit'); // located by accessibility id
I.seeElement('~edit', '#menu'); // element inside #menu
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** element to locate
-   `context` **(CodeceptJS.LocatorOrString | null)** context element (optional, default `null`)

#### checkIfElementExists

Checks if an element exists.

```js
I.checkIfElementExists('~edit'); // located by accessibility id
I.checkIfElementExists('~edit', '#menu'); // element inside #menu
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** element to locate
-   `context` **(CodeceptJS.LocatorOrString | null)** context element (optional, default `null`)

#### dontSeeElement

Checks that element is not visible.
Use second parameter to narrow down the search.

```js
I.dontSeeElement('~edit'); // located by accessibility id
I.dontSeeElement('~edit', '#menu'); // element inside #menu
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** element to locate
-   `context` **(CodeceptJS.LocatorOrString | null)** context element (optional, default `null`)

#### seeElementExists

Checks for existence of an element. An element can be visible or not.
Use second parameter to narrow down the search.

```js
I.seeElementExists('~edit'); // located by accessibility id
I.seeElementExists('~edit', '#menu'); // element inside #menu
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** element to locate
-   `context` **CodeceptJS.LocatorOrString** context element (optional, default `null`)

#### dontSeeElementExists

Checks that element not exists.
Use second parameter to narrow down the search.

```js
I.dontSeeElementExist('~edit'); // located by accessibility id
I.dontSeeElementExist('~edit', '#menu'); // element inside #menu
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** element to locate
-   `context` **CodeceptJS.LocatorOrString** context element (optional, default `null`)

#### fillField

Fills in text field in an app.
A field can be located by text, accessibility id, id.

```js
I.fillField('Username', 'davert');
I.fillField('~name', 'davert');
I.fillField({ android: 'NAME', ios: 'name' }, 'davert');
```

##### Parameters

-   `field` **CodeceptJS.LocatorOrString** an input element to fill in
-   `value` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** value to fill

#### tapReturnKey

Taps return key.
A field can be located by text, accessibility id, id.

```js
I.tapReturnKey('Username');
I.tapReturnKey('~name');
I.tapReturnKey({ android: 'NAME', ios: 'name' });
```

##### Parameters

-   `field` **CodeceptJS.LocatorOrString** an input element to fill in

#### clearField

Clears a text field.
A field can be located by text, accessibility id, id.

```js
I.clearField('~name');
```

##### Parameters

-   `field` **CodeceptJS.LocatorOrString** an input element to clear

#### appendField

Appends text into the field.
A field can be located by text, accessibility id, id.

```js
I.appendField('name', 'davert');
```

##### Parameters

-   `field` **CodeceptJS.LocatorOrString** 
-   `value` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

#### scrollUp

Scrolls to the top of an element.

```js
I.scrollUp('#container');
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** 

#### scrollDown

Scrolls to the bottom of an element.

```js
I.scrollDown('#container');
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** 

#### scrollLeft

Scrolls to the left of an element.

```js
I.scrollLeft('#container');
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** 

#### scrollRight

Scrolls to the right of an element.

```js
I.scrollRight('#container');
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** 

#### swipeUp

Performs a swipe up inside an element.
Can be `slow` or `fast` swipe.

```js
I.swipeUp('#container');
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** an element on which to perform swipe
-   `speed` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a speed to perform: `slow` or `fast`. (optional, default `'slow'`)

#### swipeDown

Performs a swipe up inside an element.
Can be `slow` or `fast` swipe.

```js
I.swipeUp('#container');
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** an element on which to perform swipe
-   `speed` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a speed to perform: `slow` or `fast`. (optional, default `'slow'`)

#### swipeLeft

Performs a swipe up inside an element.
Can be `slow` or `fast` swipe.

```js
I.swipeUp('#container');
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** an element on which to perform swipe
-   `speed` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a speed to perform: `slow` or `fast`. (optional, default `'slow'`)

#### swipeRight

Performs a swipe up inside an element.
Can be `slow` or `fast` swipe.

```js
I.swipeUp('#container');
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** an element on which to perform swipe
-   `speed` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a speed to perform: `slow` or `fast`. (optional, default `'slow'`)

#### wait

Waits for number of seconds

```js
I.wait(2); // waits for 2 seconds
```

##### Parameters

-   `sec` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** number of seconds to wait

#### waitForElement

Waits for an element to exist on page.

```js
I.waitForElement('#message', 1); // wait for 1 second
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** an element to wait for
-   `sec` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** number of seconds to wait, 5 by default (optional, default `5`)

#### waitForElementVisible

Waits for an element to be visible on page.

```js
I.waitForElementVisible('#message', 1); // wait for 1 second
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** an element to wait for
-   `sec` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** number of seconds to wait (optional, default `5`)

#### waitToHide

Waits an elmenet to become not visible.

```js
I.waitToHide('#message', 2); // wait for 2 seconds
```

##### Parameters

-   `locator` **CodeceptJS.LocatorOrString** an element to wait for
-   `sec` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** number of seconds to wait (optional, default `5`)

#### scrollToElement

Scrolls within a scrollable container to an element.

##### Parameters

-   `targetLocator` **CodeceptJS.LocatorOrString** Locator of the element to scroll to
-   `containerLocator` **CodeceptJS.LocatorOrString** Locator of the scrollable container
-   `direction` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 'up' or 'down' (optional, default `'down'`)
-   `offset` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Offset for scroll, can be adjusted based on need (optional, default `100`)
