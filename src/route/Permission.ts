import router from './';
import store from '@/store/index';
import { Auth } from '@/@types/vuex';

const whiteList = [
  '/login',
  '/',
];
/**
 * 老板 1
 * 技术 2
 * 财务 3
 * 运营 4
 */

router.beforeEach(async (to, from, next) => {
  const token = store.getters['auth/TOKEN'];
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      // 判断是否已经生成路由
      if (store.getters['auth/ADD_ROUTERS'].length === 0) {
        // 在实际业务中应该发起一个action 去请求权限接口 返回权限
        const role = await store.dispatch('auth/GET_USER_ROLE');

        await store.dispatch('auth/GENERATE_ROUTES', role);

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
