export const config = {
  tests: './*_test.ts',
  output: './output',
  helpers: {
    Detox: {
      require: '../Detox.js',
      configuration: 'android.emu.release',
      reloadReactNative: true,
      reuse: true,
    },
    Expect: {}
  },
  include: {
    I: './steps_file',
  },
  name: 'e2e',
};
