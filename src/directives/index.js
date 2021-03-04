import directives from './directives';

export default {
  install (Vue) {
    for (let [key, value] of Object.entries(directives)) {
      Vue.directive(key, value);
    }
  }
};