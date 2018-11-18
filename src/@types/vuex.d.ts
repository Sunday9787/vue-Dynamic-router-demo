/*
 * @Author: Edward
 * @Date: 2018-11-17 22:34:03
 * @Last Modified by: Edward
 * @Email: 809537981@qq.com
 * @Last Modified time: 2018-11-18 01:28:51
 */
import {
  ActionContext,
  GetterTree,
  ActionTree,
  MutationTree } from 'vuex';

interface UserInfoType {
  role: 1 | 2 | 3 | null;
  phone: number | null;
}

export namespace Auth {

  interface State {
    TOKEN: string;
    userInfo: UserInfoType
  }

  interface GettersType {
    TOKEN(state: State): string;
    [key: string]: any;
  }

  interface MutationsType {
    SET_TOKEN(state: State, token: string): void;
    SET_USER_INFO(state: State, payload: UserInfoType): void;
    REMOVE_TOKEN(state: State): void;
    [key: string]: any;
  }

  interface ActionsType {
    LOGIN(context: ActionContext<State, any>, payload: LoginForm): Promise<string>;
    LOGOUT(context: ActionContext<State, any>): Promise<string>;
    [key: string]: any;
  }

  interface StoreType {
    namespaced: boolean;
    state: State;
    getters: GetterTree<GettersType, any>;
    mutations: MutationTree<MutationsType>;
    actions: ActionTree<ActionsType, any>;
  }

  interface LoginForm {
    phone: string;
    password: string;
    role: 1 | 2 | 3,
  }

  interface LOGIN {
    (form: LoginForm): Promise<string>;
  }
}
