import router from './';
import store from '@/store/index';
import { Auth } from '@/@types/vuex';

const whiteList = [
  '/login',
  '/',
];

// 2 技术 3 财务 4 运营
const roleRouteMap = {
  1: [
    {
      name: 'home',
      children: [
        { name: 'index' },
        { name: 'app' },
        { name: 'report' },
        { name: 'account' },
      ],
    },
  ],
  2: [
    {
      name: 'home',
      children: [
        { name: 'index' },
        { name: 'app' },
        { name: 'report' },
        { name: 'account' },
      ],
    },
  ],
  3: [
    {
      name: 'home',
      children: [
        { name: 'index' },
        { name: 'report' },
        { name: 'account' },
      ],
    },
  ],
  4: [
    {
      name: 'home',
      children: [
        { name: 'index' },
        { name: 'report' },
      ],
    },
  ],
};

router.beforeEach((to, from, next) => {
  const token = store.getters['auth/TOKEN'];
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      // 判断是否已经生成路由
      if (store.getters['auth/addRouters'].length === 0) {
        const { role } = store.getters['auth/GetUserInfo'] as Auth.UserInfoType;
        store.commit('auth/GenerateRoutes', roleRouteMap[role]);
        router.addRoutes(store.getters['auth/addRouters']);
        next({...to, replace: true});
      } else {
        next();
      }
    }

  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
});
