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
   * Execute code only on iOS
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


  tap(locator) {
    return this.click(locator);
  }

  async multiTap(locator, num, context = null) {
    locator = this._detectLocator(locator);
    if (context) locator = this._detectLocator(context).withDescendant(locator);
    await element(this._detectLocator(locator)).multiTap(num);
  }

  async longPress(locator, sec, context = null) {
    locator = this._detectLocator(locator);
    if (context) locator = this._detectLocator(context).withDescendant(locator);
    await element(this._detectLocator(locator)).longPress(sec * 1000);
  }

  async click(locator, context) {
    locator = this._detectLocator(locator);
    if (context) locator = this._detectLocator(context).withDescendant(locator);
    await element(this._detectLocator(locator)).tap();
  }

  async clickAtPoint(locator, x, y) {
    await element(this._detectLocator(locator)).tapAtPoint({ x, y });
  }

  see(text, context = null) {
    if (context) {
      return expect(element(this._detectLocator(context))).toHaveText(text);
    }
    return expect(element(by.text(text))).toExist();
  }

  dontSee(text, context = null) {
    let locator = by.text(text);
    if (context) locator = this._detectLocator(context).withDescendant(locator);
    return expect(element(locator)).toNotExist();
  }

  seeElement(locator, context = null) {
    locator = this._detectLocator(locator);
    if (context) locator = this._detectLocator(context).withDescendant(locator);
    return expect(element(locator)).toExist();
  }

  dontSeeElement(locator, context = null) {
    locator = this._detectLocator(locator);
    if (context) locator = this._detectLocator(context).withDescendant(locator);
    return expect(element(locator)).toNotExist();
  }

  async fillField(field, value) {
    await element(this._detectLocator(field)).tap();
    await element(this._detectLocator(field)).replaceText(value);
  }

  async clearField(field) {
    await element(this._detectLocator(field)).tap();
    await element(this._detectLocator(field)).clearText();
  }

  async appendField(field, value) {
    await element(this._detectLocator(field)).tap();
    await element(this._detectLocator(field)).typeText(value);
  }

  async scrollTop(locator) {
    await element(this._detectLocator(locator)).scrollTo('top');
  }

  async scrollBottom(locator) {
    await element(this._detectLocator(locator)).scrollTo('bottom');
  }

  async scrollLeft(locator) {
    await element(this._detectLocator(locator)).scrollTo('left');
  }

  async scrollRight(locator) {
    await element(this._detectLocator(locator)).scrollTo('right');
  }

  async swipeTop(locator, speed = 'slow') {
    await element(this._detectLocator(locator)).swipe('top', speed);
  }

  async swipeBottom(locator, speed = 'slow') {
    await element(this._detectLocator(locator)).swipe('bottom', speed);
  }

  async swipeLeft(locator, speed = 'slow') {
    await element(this._detectLocator(locator)).swipe('left', speed);
  }

  async swipeRight(locator, speed = 'slow') {
    await element(this._detectLocator(locator)).swipe('right', speed);
  }

  

  /**
   * @param locator
   * @param sec
   */
  async waitForElement(locator, sec = 5) {
    return waitFor(element(this._detectLocator(locator))).toExist().withTimeout(sec * 1000);
  }

  async waitForElementVisible(locator, sec = 5) {
    return waitFor(element(this._detectLocator(locator))).toBeVisible().withTimeout(sec * 1000);
  }

  async waitToHide(locator, sec = 5) {
    return waitFor(element(this._detectLocator(locator))).toBeNotVisible().withTimeout(sec * 1000);
  }
  
  _detectLocator(locator) {
    if (typeof locator === 'object') {
      if (locator.android && this.device.getPlatform() === 'android') return this._detectLocator(locator.android);
      if (locator.ios && this.device.getPlatform() === 'ios') return this._detectLocator(locator.ios);
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
    return by.text(locator);
  }
}

module.exports = Detox;
