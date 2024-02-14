const {I} = inject();
Feature('Acceptance Tests');

Scenario('App started', () => {
  I.see('Welcome to\nReact Native');
})

Scenario('Get platform', async () => {
  const platform = await I.grabPlatform();
  I.expectEqual(platform, 'ios');
})

Scenario('Scroll up', async () => {
  I.swipeUp('~Debug');
  I.dontSee('Welcome to\nReact Native');
})
