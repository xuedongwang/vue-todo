import Vue from 'vue';
import lodash from 'lodash';

import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/scss/index.scss';

import directives from '@/directives';
import filters from '@/filters';

Vue.use(directives);
Vue.use(filters);

const app = new Vue({
  router,
  store,
  render: h => h(App)
});
app.$mount('#app');
