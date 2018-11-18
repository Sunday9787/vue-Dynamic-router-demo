import Vue from 'vue';
import Vuex, { ModuleTree } from 'vuex';

import auth, { UserStoreType } from './modules/user';

Vue.use(Vuex);

interface ModulesType {
  auth: UserStoreType;
}

const modules: ModuleTree<ModulesType> = { auth };

export default new Vuex.Store({ modules });
