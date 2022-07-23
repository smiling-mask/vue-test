import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import SignInView from '../views/SignInView.vue';
import SignInResultView from '../views/SignInResultView.vue';

import { Path } from '@/Constants';

const routes: Array<RouteRecordRaw> = [
  {
    path: `/${Path.Home}`,
    name: 'home',
    component: HomeView,
  },
  {
    path: `/${Path.SignIn}`,
    name: 'sign-in',
    component: SignInView,
  },
  {
    path: `/${Path.SignInResult}`,
    name: 'sign-in-result',
    component: SignInResultView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
