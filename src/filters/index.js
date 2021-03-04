import filters from './filters';

export default {
  install (Vue) {
    for (let [key, value] of Object.entries(filters)) {
      Vue.filter(key, value);
    }
  }
};