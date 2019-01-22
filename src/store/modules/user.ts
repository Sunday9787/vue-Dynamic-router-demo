import { RouteConfig } from 'vue-router';
import { setToken, removeToken } from '@/tools/auth';
import { Auth, StoreType } from '@/@types/vuex';
import permissionRouter from '@/route/dynamicRoutes';

type Role = 1 | 2 | 3 | 4;

// tslint:disable-next-line:no-empty-interface
export interface AuthStoreType extends StoreType<Auth.State, Auth.GettersType, Auth.MutationsType, Auth.ActionsType> {}



/**
 * 敲黑板
 * 返回用户是否拥有路由的权限
 *
 * @param {Role} role
 * @param {RouteConfig} route
 * @returns
 */
function hasPermission(role: Role, route: RouteConfig) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(role) as boolean;
  }
  // 如果没有指定路由权限 默认返回 此路由
  return true;
}

function filterAsyncRouter(routers: RouteConfig[], role: Role) {
  const target: RouteConfig[] = [];
  routers.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(role, route)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, role);
      }
      target.push(tmp);
    }
  });
  return target;
}

const AuthStore: AuthStoreType = {
  namespaced: true, // 使用命名空间
  state: {
    TOKEN: '',
    userInfo: {
      role: 1,
      phone: null,
    },
    addRouters: [],
  },
  getters: {
    TOKEN(state) {
      return state.TOKEN;
    },
    USER_INFO(state) {
      return state.userInfo;
    },
    ADD_ROUTERS(state) {
      return state.addRouters;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.TOKEN = token;
      setToken(token);
    },
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
    REMOVE_TOKEN(state) {
      state.TOKEN = '';
      removeToken();
    },
    SET_ROUTER(state, router) {
      state.addRouters = router;
    },
  },
  actions: {
    LOGIN({ commit }, { phone, role, password }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // 向后端提交请求 返回true
          commit('SET_TOKEN', '2ZV74_7d2m2KuVmFEWjgF-FnnLo-rqzMOxrodzJn7BsoPJLa');
          commit('SET_USER_INFO', { phone, role });
          resolve(password);
        }, 2000);
      });
    },
    LOGOUT({ commit }) {
      return new Promise((resolve) => {
        commit('REMOVE_TOKEN');
        // 向后端提交请求 返回true
        setTimeout(() => {
          resolve('LOGOUT');
        }, 2000);
      });
    },
    GENERATE_ROUTES({ commit }, role) {
      return new Promise((resolve) => {
        let accessedRouters;
        if (role === 1) {
          accessedRouters = permissionRouter;
        } else {
          accessedRouters = filterAsyncRouter(permissionRouter, role);
        }
        commit('SET_ROUTER', accessedRouters);
        resolve();
      });
    },
  },
};

export default AuthStore;
