import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../views/Home/index.vue';
import SignIn from '../views/SignIn/index.vue';
import SignInResult from '../views/SignInResult/index.vue';

import { Path } from '@/Constants';

const routes: Array<RouteRecordRaw> = [
  {
    path: `/${Path.Home}`,
    name: 'home',
    component: Home,
  },
  {
    path: `/${Path.SignIn}`,
    name: 'sign-in',
    component: SignIn,
  },
  {
    path: `/${Path.SignInResult}`,
    name: 'sign-in-result',
    component: SignInResult,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
