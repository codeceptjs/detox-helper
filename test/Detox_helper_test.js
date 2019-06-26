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
  
    xit('should long press on an element', async () => {
      await I.longPress('Tap Me');
      await I.see('Long Press Working!!!');
    });
  
    xit('should long press with duration on an element', async () => {
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
      await I.fillField('#UniqueId006', 'replaced_text');
      await I.see('Replace Working!!!');
    });
    
    // edges: 'top'/'bottom'/'left'/'right'
    it('should scroll to edge', async () => {
      await I.dontSee('Text8');
      await I.scrollDown('#ScrollView161');
      await I.see('Text8');
      await I.scrollUp('#ScrollView161');
      await I.see('Text1');
    });
  
    // TODO - swipe is not good enough for triggering pull to refresh. need to come up with something better
    // directions: 'up'/'down'/'left'/'right', speed: 'fast'/'slow'
    xit('should swipe down until pull to reload is triggered', async () => {
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

  describe('Assertions', () => {
    beforeEach(async () => {
      await I.click('Assertions');
    });
  
    it('should assert an element is visible', async () => {
      await I.seeElement('#UniqueId204');
    });
  
    it('should assert an element is not visible', async () => {
      await I.dontSeeElement('#UniqueId205');
    });
  
    // prefer toBeVisible to make sure the user actually sees this element
    it('should assert an element exists', async () => {
      await I.seeElementExists('#UniqueId205');
    });
  
    it('should assert an element does not exist', async () => {
      await I.dontSeeElementExists('#RandomJunk959');
    });
  
    // matches specific text elements like UIButton, UILabel, UITextField or UITextView, RCTText
    it('should assert an element has text', async () => {
      await I.see('I contain some text', '#UniqueId204');
    });  
  });
  
  describe('Device Orientation', () => {
    beforeEach(async() => {
      await I.click('Orientation');
      await I.seeElementExists('#currentOrientation');
    });
  
    it('OrientationLandscape', async () => {
      await I.setLandscapeOrientation();
      await I.see('Landscape', '#currentOrientation'); 
    });
  
    it('OrientationPortrait', async() => {
      // As default is portrait we need to set it otherwise
      await I.setLandscapeOrientation();
      await I.setPortraitOrientation();
      await I.see('Portrait', '#currentOrientation'); 
    });
  });

  describe('#saveScreenshot', () => {
    it('should save screenshot', async () => {
      await I.saveScreenshot('name');
    })
  })

  describe('#saveScreenshot', () => {
    beforeEach(() => {
      global.output_dir = path.join(__dirname, '/../output');
    });

    it('should create a screenshot file in output dir', async () => {
      const sec = (new Date()).getUTCMilliseconds();
      await I.amOnPage('/')
      await I.saveScreenshot(`screenshot_${sec}.png`);
      await assert.ok(fileExists(path.join(global.output_dir, `screenshot_${sec}.png`)), null, 'file does not exists');
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

    it('should wait until an element is removed', async () => {
      await I.seeElement('#deletedFromHierarchyText');
      await I.click('#GoButton');
      await I.waitToHide('#deletedFromHierarchyText', 20);
      await I.dontSeeElement('#deletedFromHierarchyText');
    });    
  });
});
