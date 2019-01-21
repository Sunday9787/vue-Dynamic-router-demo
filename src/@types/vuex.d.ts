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
  
  interface StoreType<S,G,M,A> {
    namespaced?: boolean;
    state: S;
    getters: GetterTree<G, any>;
    mutations: MutationTree<M>;
    actions: ActionTree<A, any>;
  }

export namespace Auth {

  interface UserInfoType {
    role: 1 | 2 | 3 | 4;
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
  }

  interface GettersType {
    TOKEN(state: State): string;
    GetUserInfo(state: State): UserInfoType;
    addRouters(state: State): any[];
    [key: string]: any;
  }

  interface MutationsType {
    SET_TOKEN(state: State, token: string): void;
    SET_USER_INFO(state: State, payload: UserInfoType): void;
    REMOVE_TOKEN(state: State): void;
    GENERATE_ROUTES(state: State, payload: GenerateRoutesPayload[]): void;
    [key: string]: any;
  }

  interface ActionsType {
    LOGIN(context: ActionContext<State, any>, payload: LoginForm): Promise<string>;
    LOGOUT(context: ActionContext<State, any>): Promise<string>;
    [key: string]: any;
  }

  interface LoginForm {
    phone: string;
    password: string;
    /**
     * 2 技术 3 财务 4 运营
     */
    role: 1 | 2 | 3 | 4,
  }

  interface LOGIN {
    (form: LoginForm): Promise<string>;
  }
}
