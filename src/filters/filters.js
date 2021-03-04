import { format } from 'timeago.js';
export default {
  ago (timestamp) {
    return format(timestamp, 'zh_CN');
  }
};
