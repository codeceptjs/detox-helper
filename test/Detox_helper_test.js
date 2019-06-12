const Detox = require('../Detox');
let configuration = process.env.CONF || 'android.emu.release';

let I;

describe('Detox', function () {
  // this.retries(1);
  this.timeout(0);

  
  before(async () => {
    global.codecept_dir = __dirname;
    I = new Detox({
      configuration,
      reloadReactNative: true,
    });
    return I._beforeSuite();
  });

  beforeEach(async () => {
    await I._before();
  });

  afterEach(async () => await I._after());

  after(async () => await I._afterSuite());
  
  describe('Sanity', () => {
    beforeEach(async () => {
      await I.click('Sanity');
    });
  
    it('should have welcome screen', async () => {
      await I.see('Welcome');
      await I.see('Say Hello');
      await I.see('Say World');
    });
  
    it('should show hello screen after tap', async () => {
      await I.click('Say Hello');
      await I.see('Hello!!!');
    });
  
    it('should show world screen after tap', async () => {
      await I.click('Say World');
      await I.see('World!!!');
    });
  });
    
  describe('Matchers', () => {
    beforeEach(async () => {
      await I.click('Matchers');
    });
  
    it('should match elements by (accessibility) label', async () => {
      await I.click('~Label');
      await I.see('Label Working!!!');
    });
  
    it('should match elements by (accessibility) id', async () => {
      await I.click('#UniqueId345');
      await I.see('ID Working!!!');
    });
  
    xit('[WIP] should match elements by index', async () => {
      const index = device.getPlatform() === 'ios' ? 2 : 0;
      await element(by.text('Index')).atIndex(index).tap();
      await expect(element(by.text('First button pressed!!!'))).toBeVisible();
    });
  
    it('should match elements by type (native class)', async () => {
      const type = { 
        android: { type: 'android.widget.ImageView' },
        ios: { type: 'RCTImageView' },
      }
      I.seeElement(type);
      I.click(type);
      I.dontSeeElement(type);
    });
  
  });
  
  describe('Actions', () => {
    beforeEach(async () => {
      await device.reloadReactNative();
      await I.click('Actions');
    });
  
    it('should tap on an element', async () => {
      await I.click('Tap Me');
      await I.see('Tap Working!!!');
    });
  
    it('should long press on an element', async () => {
      await I.longPress('Tap Me');
      await I.see('Long Press Working!!!');
    });
  
    it('should long press with duration on an element', async () => {
      await I.longPress('Long Press Me 1.5s', 1.5);
      await I.see('Long Press With Duration Working!!!');
    });
  
    it('should multi tap on an element', async () => {
      await I.multiTap('#UniqueId819', 3);
      await I.see('Taps: 3', '#UniqueId819');
    });
  
    it('should tap on an element at point', async () => {
      await I.clickAtPoint('#View7990', 180, 160);
      await I.see('Taps: 1', '#UniqueId819');
    });
  
    it('should type in an element', async () => {
      await I.appendField('#UniqueId937', 'passcode');
      await I.see('Type Working!!!');
    });
  
    xit('should press the backspace key on an element', async () => {
      await element(by.id('UniqueId937')).tap();
      await element(by.id('UniqueId937')).typeText('testx');
      await element(by.id('UniqueId937')).tapBackspaceKey();
      await expect(element(by.text('test'))).toBeVisible();
    });
  
    xit('should press the return key on an element', async () => {
      await element(by.id('UniqueId937')).tap();
      await element(by.id('UniqueId937')).tapReturnKey();
      await expect(element(by.text('Return Working!!!'))).toBeVisible();
    });
  
    it('should clear text in an element', async () => {
      await I.clearField('#UniqueId005');
      await I.see('Clear Working!!!');
    });
  
    it('should replace text in an element', async () => {
      await I.fillField('#UniqueId006', 'replaced_test');
      await I.see('Replace Working!!!');
    });
    
    // edges: 'top'/'bottom'/'left'/'right'
    it('should scroll to edge', async () => {
      await I.dontSee('Text8');
      await I.scrollBottom('#ScrollView161');
      await I.see('Text8');
      await I.scrollTop('#ScrollView161');
      await I.see('Text1');
    });
  
    // TODO - swipe is not good enough for triggering pull to refresh. need to come up with something better
    // directions: 'up'/'down'/'left'/'right', speed: 'fast'/'slow'
    it('should swipe down until pull to reload is triggered', async () => {
      await I.swipeDown('#ScrollView799');
      await I.see('PullToReload Working!!!');
    });
  
    xit('should not wait for long timeout (>1.5s)', async () => {
      await element(by.id('WhyDoAllTheTestIDsHaveTheseStrangeNames')).tap();
      await expect(element(by.id('WhyDoAllTheTestIDsHaveTheseStrangeNames'))).toBeVisible();
    });
  
    xit(':ios: should zoom in and out the pinchable scrollview', async () => {
      await element(by.id('PinchableScrollView')).pinchWithAngle('outward', 'slow', 0);
      await expect(element(by.id('UniqueId007'))).toBeNotVisible();
      await element(by.id('PinchableScrollView')).pinchWithAngle('inward', 'slow', 0);
      await expect(element(by.id('UniqueId007'))).toBeVisible();
    });
  });

  describe('#wait', () => {
    beforeEach(async () => {
      await I.click('WaitFor');
    });

    it('should wait until an element is created and exists in layout', async () => {
      await I.dontSeeElement('#createdAndVisibleText');
      await I.click('#GoButton');
      await I.waitForElement('#createdAndVisibleText', 20);
      await I.seeElement('#createdAndVisibleText');
    });
  });
});
