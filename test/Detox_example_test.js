const Detox = require('../Detox');
const path = require('path');
let configuration = process.env.CONF || 'android.example.local';


let I;


describe('Detox', function () {
  // this.retries(1);
  this.timeout(0);

  before(() => {
    global.codecept_dir = path.join(__dirname);
    I = new Detox({
      configuration,
      reloadReactNative: false,
    });
    return I._beforeSuite();
  });

  beforeEach(async () => {
    await I._before();
  });

  afterEach(() => I._after());

  describe('#seeElement', () => {
    it('should have welcome screen #1', async () => {
      I.seeElement('#welcome');
      I.seeElement({ id: 'welcome' });
    });
  });

  describe('#see', () => {
    it('should see welcome screen', async () => {
      await I.see('Welcome');
    });
  });

  describe('#click', () => {
    it('should show hello screen after tap', async () => {
      await I.dontSee('Hello!!!');
      await I.click('#hello_button');
      await I.see('Hello!!!');
    });

    it('should show world screen after tap', async () => {
      await I.click('#world_button');
      await I.see('World!!!');
    });
  });

});
