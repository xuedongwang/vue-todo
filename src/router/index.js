import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/pages/home'),
    meta: {
      needLogin: false
    }
  },
  {
    path: '/404',
    component: () => import('@/404'),
    meta: {
      needLogin: false
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;

