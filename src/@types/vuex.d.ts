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
  import { RouteConfig } from 'vue-router';
  
  interface StoreType<S> {
    namespaced?: boolean;
    state: S;
    getters: GetterTree<S, any>;
    mutations: MutationTree<S>;
    actions: ActionTree<S, any>;
  }

export namespace Auth {

  interface UserInfoType {
    role?: 1 | 2 | 3 | 4;
    phone: number | null;
  }

  interface GenerateRoutesPayload {
    name: string;
    children: GenerateRoutesPayload[]
  }

  interface State {
    TOKEN: string;
    userInfo: UserInfoType;
    addRouters: any[],
    role?: number;
  }

  interface LoginForm {
    phone: string;
    password: string;
    /**
     * 2 技术 3 财务 4 运营
     */
    role: 1 | 2 | 3 | 4 | '',
  }

  interface LOGIN {
    (form: LoginForm): Promise<string>;
  }
}
