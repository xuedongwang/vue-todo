import Vue from 'vue';
import lodash from 'lodash';

import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/scss/index.scss';

import directives from '@/utils/directives';
import filters from '@/utils/filters';

import Notify from './components/notify';

console.log(Notify);

Vue.use(directives);
Vue.use(filters);

Vue.use(Notify);

window._ = lodash;

const app = new Vue({
  router,
  store,
  render: h => h(App)
});
app.$mount('#app');
