const Helper = require('codeceptjs').helper;
const recorder = require('codeceptjs').recorder;
const path = require('path');

let detox;
let by;
let element;
let expect;
let waitFor;

class Detox extends Helper {
  
  constructor(config) {
    super(config);
    this._setConfig(config);
    this._registerOptions();

    detox = require('detox');
    this.device = detox.device;
    this._registerGlobals();
  }

  _registerOptions() {
    if (this.options.configuration) {
      process.argv.push('--configuration');
      process.argv.push(this.options.configuration);
    }
  }

  _registerGlobals() {
    global.by = by = detox.by;
    global.element = element = detox.element;
    global.expect = expect = detox.expect;
    global.waitFor = waitFor = detox.waitFor;
  }

  _validateConfig(config) {
    const defaults = {
      launchApp: true,
      reuse: false,
      reloadReactNative: false,
    };

    const detoxConf = require(path.join(global.codecept_dir, 'package.json')).detox;

    return Object.assign(defaults, detoxConf, config);
  }


  static _checkRequirements() {
    try {
      require('detox');
    } catch (e) {
      return ['detox@^12'];
    }
  }

  async _beforeSuite() {
    const { reuse, launchApp } = this.options;    
    await detox.init(this.options, { reuse, launchApp });

    if (this.options.reloadReactNative) {
      return this.device.launchApp({ newInstance: true });
    }
  }

  async _afterSuite() {
    await detox.cleanup();
  }

  async _before(test) {
    if (this.options.reloadReactNative) {
      await this.device.reloadReactNative();
    } else {
      await this.device.launchApp({ newInstance: true });
    }
  }

  async _test(test) {
    await detox.beforeEach({
      title: test.title,
      fullName: test.fullTitle(),
    });
  }

  async _passed(test) {
    await detox.afterEach({
      title: test.title,
      fullName: test.fullTitle(),
      status: 'passed',
    });
  }

  async _failed(test) {
    await detox.afterEach({
      title: test.title,
      fullName: test.fullTitle(),
      status: 'failed',
    });
  }

  async _locate(locator) {
    return element(this._detectLocator(locator, 'type'));
  }

  async _locateClickable(locator) {
    return element(this._detectLocator(locator, 'type'));
  }

  async relaunchApp() {
    return this.device.launchApp({ newInstance: true });
  }

  async launchApp() {
    return this.device.launchApp({ newInstance: false });
  }

  async installApp() {
    return this.device.installApp();
  }

  async shakeDevice() {
    await this.device.shake();
  }

  /**
  * Goes back on Android
  * 
  * ```js
  * I.goBack(); // on Android only
  * ```
  */
  async goBack() {
    await this.device.pressBack();
  }

  /**
  * Switches device to landscape orientation
  * 
  * ```js
  * I.setLandscapeOrientation();
  * ```
  */
  async setLandscapeOrientation() {
    await this.device.setOrientation('landscape');
  }

  /**
   * Switches device to portrait orientation
   * 
   * ```js
   * I.setPortraitOrientation();
   * ```
   */
  async setPortraitOrientation() {
    await this.device.setOrientation('portrait');
  }

  /**
   * Execute code only on iOS
   *
   * ```js
   * I.runOnIOS(() => {
    *    I.click('Button');
    *    I.see('Hi, IOS');
    * });
    * ```
    *
    */
   async runOnIOS(fn) {
     if (device.getPlatform() !== 'ios') return;
     recorder.session.start('iOS-only actions');
     fn();
     recorder.add('restore from iOS session', () => recorder.session.restore());
     return recorder.promise();
  }


  /**
   * Execute code only on Android
   *
   * ```js
   * I.runOnAndroid(() => {
    *    I.click('Button');
    *    I.see('Hi, Android');
    * });
    * ```
    *
    */
   async runOnAndroid(fn) {
     if (device.getPlatform() !== 'android') return;
     recorder.session.start('Android-only actions');
     fn();
     recorder.add('restore from Android session', () => recorder.session.restore());
     return recorder.promise();
  }  


  /**
   * Taps on an element. 
   * Element can be located by its text or id or accessibility id.
   * 
   * The second parameter is a context element to narrow the search.
   * 
   * Same as [click](#click)
   * 
   * ```js
   * I.tap('Login'); // locate by text
   * I.tap('~nav-1'); // locate by accessibility label
   * I.tap('#user'); // locate by id
   * I.tap('Login', '#nav'); // locate by text inside #nav
   * I.tap({ ios: 'Save', android: 'SAVE' }, '#main'); // different texts on iOS and Android
   * ```
   * 
   * @param {string|object} locator 
   * @param {string|object} [context=null] 
   */
  tap(locator, context = null) {
    return this.click(locator, context);
  }

  /**
   * Multi taps on an element.
   * Element can be located by its text or id or accessibility id.
   * 
   * Set the number of taps in second argument.
   * Optionally define the context element by third argument.
   * 
   * ```js
   * I.multiTap('Login', 2); // locate by text
   * I.multiTap('~nav', 2); // locate by accessibility label
   * I.multiTap('#user', 2); // locate by id
   * I.multiTap('Update', 2, '#menu'); // locate by id
   * ```
   * 
   * @param {string|object} locator element to locate
   * @param {int} num number of taps 
   * @param {string|object} [context=null] context element
   */
  async multiTap(locator, num, context = null) {
    locator = this._detectLocator(locator, 'text');
    if (context) locator = this._detectLocator(context).withDescendant(locator);
    await element(locator).multiTap(num);
  }

  /**
   * Taps an element and holds for a requested time.
   * 
   * ```js
   * I.longPress('Login', 2); // locate by text, hold for 2 seconds
   * I.longPress('~nav', 1); // locate by accessibility label, hold for second
   * I.longPress('Update', 2, '#menu'); // locate by text inside #menu, hold for 2 seconds
   * ```
   * 
   * @param {string|object} locator element to locate
   * @param {num} sec number of seconds to hold tap
   * @param {string|object} context context element 
   */
  async longPress(locator, sec, context = null) {
    locator = this._detectLocator(locator, 'text');
    if (context) locator = this._detectLocator(context).withDescendant(locator);
    await element(locator).longPress(sec * 1000);
  }


  /**
   * Clicks on an element. 
   * Element can be located by its text or id or accessibility id
   * 
   * The second parameter is a context (id | type | accessibility id) to narrow the search.
   * 
   * Same as [tap](#tap)
   * 
   * ```js
   * I.click('Login'); // locate by text
   * I.click('~nav-1'); // locate by accessibility label
   * I.click('#user'); // locate by id
   * I.click('Login', '#nav'); // locate by text inside #nav
   * I.click({ ios: 'Save', android: 'SAVE' }, '#main'); // different texts on iOS and Android
   * ```
   * 
   * @param {string|object} locator 
   * @param {string|object} [context=null] 
   */
  async click(locator, context = null) {
    locator = this._detectLocator(locator, 'text');
    if (context) locator = this._detectLocator(context).withDescendant(locator);
    await element(locator).tap();
  }

  /**
  * Performs click on element with horizontal and vertical offset.
  * An element is located by text, id, accessibility id.
  * 
  * ```js
  * I.clickAtPoint('Save', 10, 10);
  * I.clickAtPoint('~save', 10, 10); // locate by accessibility id
  * ```
  * 
  * @param {string|object} locator
  * @param {int} [x=0] horizontal offset
  * @param {int} [y=0] vertical offset
  * 
  */
  async clickAtPoint(locator, x = 0, y = 0) {
    await element(this._detectLocator(locator, 'text')).tapAtPoint({ x, y });
  }

  /**
   * Checks text to be visible.
   * Use second parameter to narrow down the search.
   * 
   * ```js
   * 
   * ```
   * 
   * @param {string} text to check visibility
   * @param {string|object} [context=null] element inside which to search for text 
   */
  see(text, context = null) {
    if (context) {
      return expect(element(this._detectLocator(context))).toHaveText(text);
    }
    return expect(element(by.text(text))).toExist();
  }

  /**
   * 
   * @param {string} text 
   * @param {string|object} context 
   */
  dontSee(text, context = null) {
    let locator = by.text(text);
    if (context) locator = this._detectLocator(context).withDescendant(locator);
    return expect(element(locator)).toBeNotVisible();
  }

  /**
   * 
   * @param {string|object} locator 
   * @param {string|object} [context=null]
   */
  seeElement(locator, context = null) {
    locator = this._detectLocator(locator);
    if (context) locator = this._detectLocator(context).withDescendant(locator);
    return expect(element(locator)).toBeVisible();
  }


  /**
   * 
   * @param {string|object} locator 
   * @param {string|object} [context=null]
   */  
  dontSeeElement(locator, context = null) {
    locator = this._detectLocator(locator);
    if (context) locator = this._detectLocator(context).withDescendant(locator);
    return expect(element(locator)).toBeNotVisible();
  }

  /**
   * 
   * @param {string|object} locator 
   * @param {string|object} context 
   */
  seeElementExist(locator, context = null) {
    locator = this._detectLocator(locator);
    if (context) locator = this._detectLocator(context).withDescendant(locator);
    return expect(element(locator)).toExist();
  }

  /**
   * 
   * @param {string|object} locator 
   * @param {string|object} context 
   */
  dontSeeElementExist(locator, context = null) {
    locator = this._detectLocator(locator);
    if (context) locator = this._detectLocator(context).withDescendant(locator);
    return expect(element(locator)).toNotExist();
  }

  /**
   * 
   * @param {string|object} field 
   * @param {string} value 
   */
  async fillField(field, value) {
    const locator = this._detectLocator(field, 'text');
    await element(locator).tap();
    await element(locator).replaceText(value);
  }

  /**
   * 
   * @param {string|object} field 
   */
  async clearField(field) {
    const locator = this._detectLocator(field, 'text');
    await element(locator).tap();
    await element(locator).clearText();
  }

  /**
   * 
   * @param {string|object} field 
   * @param {string} value 
   */
  async appendField(field, value) {
    const locator = this._detectLocator(field, 'text');
    await element(locator).tap();
    await element(locator).typeText(value);
  }

  /**
   * 
   * @param {string|object} locator 
   */
  async scrollUp(locator) {
    await element(this._detectLocator(locator)).scrollTo('top');
  }

  /**
   * 
   * @param {string|object} locator 
   */
  async scrollDown(locator) {
    await element(this._detectLocator(locator)).scrollTo('bottom');
  }

  /**
   * 
   * @param {string|object} locator 
   */
  async scrollLeft(locator) {
    await element(this._detectLocator(locator)).scrollTo('left');
  }


  /**
   * 
   * @param {string|object} locator 
   */
  async scrollRight(locator) {
    await element(this._detectLocator(locator)).scrollTo('right');
  }


  /**
   * 
   * @param {string|object} locator 
   */
  async swipeUp(locator, speed = 'slow') {
    await element(this._detectLocator(locator)).swipe('up', speed);
  }


  /**
   * 
   * @param {string|object} locator 
   */
  async swipeDown(locator, speed = 'slow') {
    await element(this._detectLocator(locator)).swipe('down', speed);
  }


  /**
   * 
   * @param {string|object} locator 
   */
  async swipeLeft(locator, speed = 'slow') {
    await element(this._detectLocator(locator)).swipe('left', speed);
  }


  /**
   * 
   * @param {string|object} locator 
   */
  async swipeRight(locator, speed = 'slow') {
    await element(this._detectLocator(locator)).swipe('right', speed);
  }

  /**
   * Waits for number of seconds
   * 
   * ```js
   * I.wait(2); // waits for 2 seconds
   * ```
   * 
   * @param {int} sec number of seconds to wait
   */
  async wait(sec) {
    return new Promise(((done) => {
      setTimeout(done, sec * 1000);
    }));
  }

  /**
   * @param locator
   * @param sec
   */
  async waitForElement(locator, sec = 5) {
    return waitFor(element(this._detectLocator(locator))).toExist().withTimeout(sec * 1000);
  }

  /**
   * 
   * @param {string|object} locator 
   * @param {int} sec 
   */
  async waitForElementVisible(locator, sec = 5) {
    return waitFor(element(this._detectLocator(locator))).toBeVisible().withTimeout(sec * 1000);
  }

  /**
   * 
   * @param {string|object} locator 
   * @param {int} sec 
   */
  async waitToHide(locator, sec = 5) {
    return waitFor(element(this._detectLocator(locator))).toBeNotVisible().withTimeout(sec * 1000);
  }
  
  _detectLocator(locator, type = 'type') {
    if (typeof locator === 'object') {
      if (locator.android && this.device.getPlatform() === 'android') return this._detectLocator(locator.android, type);
      if (locator.ios && this.device.getPlatform() === 'ios') return this._detectLocator(locator.ios, type);
      if (locator.id) return by.id(locator.id);
      if (locator.label) return by.label(locator.label);
      if (locator.text) return by.text(locator.text);
      if (locator.type) return by.type(locator.type);
      if (locator.traits) return by.traits(locator.traits);
      return locator;
    }
  
    if (locator[0] === '#') {
      return by.id(locator.slice(1));
    }
    if (locator[0] === '~') {
      return by.label(locator.slice(1));
    }
    if (type ==='text') {
      return by.text(locator);
    }
    return by.type(locator);
  }
}

module.exports = Detox;
