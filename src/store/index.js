import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import form from './modules/form'
import getters from './getters'

Vue.use(Vuex);

// 创建VueX对象

export default new Vuex.Store({
  state: {
    name: 'i am root state name'
  },
  modules:{
    user,
    form
  },
  getters
})
