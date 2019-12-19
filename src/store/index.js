import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  plugins: []
});

export default store;