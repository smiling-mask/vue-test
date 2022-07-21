import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import SignInView from '../views/SignInView.vue';
import SignInResultView from '../views/SignInResultView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/sign-in',
    name: 'signinview',
    component: SignInView,
  },
  {
    path: '/sign-in-result',
    name: 'signinresult',
    component: SignInResultView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
