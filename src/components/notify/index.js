import notify from './func-notify';
export default {
  install (Vue, options = {}) {
    Vue.prototype.$notify = notify;
  }
};