import { format } from 'timeago.js';
const filters = {
  ago (timestamp) {
    return format(timestamp, 'zh_CN');
  }
};

export default {
  install (Vue) {
    for (let [key, value] of Object.entries(filters)) {
      Vue.filter(key, value);
    }
    return 1;
  }
};