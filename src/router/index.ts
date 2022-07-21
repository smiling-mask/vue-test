import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import SignInView from '../views/SignInView.vue';
import SignInResultView from '../views/SignInResultView.vue';

import { Path } from '@/Constants';

const routes: Array<RouteRecordRaw> = [
  {
    path: `/${Path.Home}`,
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: `/${Path.SignIn}`,
    name: 'SignInView',
    component: SignInView,
  },
  {
    path: `/${Path.SignInResult}`,
    name: 'SignInResultView',
    component: SignInResultView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
