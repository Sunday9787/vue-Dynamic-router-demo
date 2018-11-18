import Vue from 'vue';
import Router from 'vue-router';
import layout from '@/components/layout/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue'),
      meta: { title: '登录' },
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/home/index',
      component: layout,
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('@/views/home/index.vue'),
        },
        {
          path: 'app',
          name: 'app',
          component: () => import('@/views/home/app.vue'),
        },
        {
          path: 'report',
          name: 'report',
          component: () => import('@/views/home/report/index.vue'),
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('@/views/home/account/index.vue'),
          children: [
            {
              path: 'recharge',
              name: 'recharge',
              component: () => import('@/views/home/account/recharge.vue'),
            },
            {
              path: 'withdraw',
              name: 'withdraw',
              component: () => import('@/views/home/account/withdraw.vue'),
            }
          ],
        },
      ],
    },
  ],
});
