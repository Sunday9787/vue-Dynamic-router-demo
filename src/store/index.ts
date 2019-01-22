import Vue from 'vue';
import Vuex, { ModuleTree } from 'vuex';

import auth, { AuthStoreType } from './modules/user';

Vue.use(Vuex);

interface ModulesType {
  auth: AuthStoreType;
}

const modules: ModuleTree<ModulesType> = { auth };

export default new Vuex.Store({ modules });
