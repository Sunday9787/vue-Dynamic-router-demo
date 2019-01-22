import { RouteConfig } from 'vue-router';

/**
 * 切记 路由权限要跟 菜单栏 权限 对应
 */

const dynamicRoutes: RouteConfig[] = [
  {
    path: '/home',
    name: 'home',
    redirect: '/home/index',
    component: () => import('@/components/layout/index.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          roles: [1, 2, 3, 4],
        },
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: 'app',
        name: 'app',
        meta: {
          roles: [1, 2, 3],
        },
        component: () => import('@/views/home/app.vue'),
      },
      {
        path: 'account',
        name: 'account',
        meta: {
          roles: [1, 3],
        },
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
          },
        ],
      },
      {
        path: 'report',
        name: 'report',
        meta: {
          roles: [1, 2, 4],
        },
        component: () => import('@/views/home/report/index.vue'),
      },
    ],
  },
];

export default dynamicRoutes;
