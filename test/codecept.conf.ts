export const config = {
  tests: './*_test.ts',
  output: './output',
  helpers: {
    Detox: {
      require: '../Detox.js',
      configuration: process.env.CONF || 'android.emu.release',
      reuse: true,
    },
    ExpectHelper: {}
  },
  include: {
    I: './steps_file',
  },
  name: 'e2e',
};
