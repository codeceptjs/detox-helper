/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type Detox = import('./helpers/detoxHelper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends Detox, ExpectHelper {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
