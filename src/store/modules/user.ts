import { setToken, removeToken } from '@/tools/auth';
import { Auth } from '@/@types/vuex';
import Allrouter from '@/route/Permissroute';
import { filterAsyncRouter } from '@/tools';

export interface UserStoreType extends Auth.StoreType {}



const state: Auth.State = {
  TOKEN: '',
  userInfo: {
    role: 1,
    phone: null,
  },
  addRouters: [],
};

const getters: Auth.GettersType = {
  TOKEN(state) {
    return state.TOKEN;
  },
  GetUserInfo(state) {
    return state.userInfo;
  },
  addRouters(state) {
    return state.addRouters;
  }
};

const mutations: Auth.MutationsType = {
  SET_TOKEN(state, token: string) {
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
  GenerateRoutes(state, payload) {
    state.addRouters = filterAsyncRouter(Allrouter, payload);
  },
};

const actions: Auth.ActionsType = {
  LOGIN ({ commit }, { phone, role, password }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 向后端提交请求 返回true
        commit('SET_TOKEN', '2ZV74_7d2m2KuVmFEWjgF-FnnLo-rqzMOxrodzJn7BsoPJLa');
        commit('SET_USER_INFO', { phone, role });
        resolve(password);
      }, 2000);
    });
  },
  LOGOUT ({ commit }) {
    return new Promise((resolve) => {
      commit('REMOVE_TOKEN');
      // 向后端提交请求 返回true
      setTimeout(() => {
        resolve('LOGOUT');
      }, 2000);
    });
  },
};

export default {
  namespaced: true, // 使用命名空间
  state,
  getters,
  mutations,
  actions,
};
