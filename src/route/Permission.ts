import router from './';
import store from '@/store/index';
import { Auth } from '@/@types/vuex';

const whiteList = [
  '/login',
  '/',
];

// 1 boss 2 技术 3 财务 4 运营

router.beforeEach((to, from, next) => {
  const token = store.getters['auth/TOKEN'];
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      // 判断是否已经生成路由
      if (store.getters['auth/ADD_ROUTERS'].length === 0) {
        // 在实际业务中应该发起一个action 去请求权限接口 返回权限
        const { role } = store.getters['auth/USER_INFO'] as Auth.UserInfoType;
        store.dispatch('auth/GENERATE_ROUTES', role);
        router.addRoutes(store.getters['auth/ADD_ROUTERS']);
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
