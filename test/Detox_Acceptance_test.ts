const {I} = inject();
Feature('Acceptance Tests');

Before(() => {
  I.launchApp();
  I.waitForElementVisible('#hello_button');
})

Scenario('App started', () => {
  I.see('Welcome');
})

Scenario('Get platform', async () => {
  const platform = await I.grabPlatform();
  process.env.CONF && process.env.CONF.includes('ios') ? I.expectEqual(platform, 'ios') : I.expectEqual(platform, 'android');
})

Scenario('Show hello screen after tap', () => {
  I.dontSee('Hello!!!');
  I.click('#hello_button');
  I.see('Hello!!!');
});

Scenario('Show world screen after tap', () => {
  I.click('#world_button');
  I.see('World!!!');
});
