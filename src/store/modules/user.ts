import { setToken, removeToken } from '@/tools/auth';
import { Auth, StoreType } from '@/@types/vuex';
import Allrouter from '@/route/Permissroute';
import { filterAsyncRouter } from '@/tools';

// tslint:disable-next-line:no-empty-interface
export interface UserStoreType extends StoreType<Auth.State, Auth.GettersType, Auth.MutationsType, Auth.ActionsType> {}

interface AuthStoreType {
  namespaced: boolean;
  state: Auth.State;
  mutations: Auth.MutationsType;
  getters: Auth.GettersType;
  actions: Auth.ActionsType;
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
    TOKEN(states) {
      return states.TOKEN;
    },
    GetUserInfo(states) {
      return states.userInfo;
    },
    addRouters(states) {
      return states.addRouters;
    },
  },
  mutations: {
    SET_TOKEN(states, token) {
      states.TOKEN = token;
      setToken(token);
    },
    SET_USER_INFO(states, payload) {
      states.userInfo = payload;
    },
    REMOVE_TOKEN(states) {
      states.TOKEN = '';
      removeToken();
    },
    GENERATE_ROUTES(states, payload) {
      states.addRouters = filterAsyncRouter(Allrouter, payload);
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
  },
};

export default AuthStore;
