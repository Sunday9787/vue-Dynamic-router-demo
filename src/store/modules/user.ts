import { setToken, removeToken } from '@/tools/auth';
import { Auth } from '@/@types/vuex';

export interface UserStoreType extends Auth.StoreType {}

export interface LoginForm extends Auth.LoginForm {}



const state: Auth.State = {
  TOKEN: '',
  userInfo: {
    role: null,
    phone: null,
  }
}; 

const getters: Auth.GettersType = {
  TOKEN(state) {
    return state.TOKEN;
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
