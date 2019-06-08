const Detox = require('../Detox');
let configuration = process.env.configuration || 'android.emu.debug';

let I;

describe('Detox', function () {
  // this.retries(1);
  this.timeout(0);

  before(() => {
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

  afterEach(() => I._after());
  
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
