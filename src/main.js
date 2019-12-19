import Vue from 'vue';
import lodash from 'lodash';
import VueI18n from 'vue-i18n'

import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/scss/index.scss';

import directives from '@/utils/directives';
import filters from '@/utils/filters';

Vue.use(VueI18n);
Vue.use(directives);
Vue.use(filters);

window._ = lodash;

const app = new Vue({
  router,
  store,
  render: h => h(App)
});
app.$mount('#app');
