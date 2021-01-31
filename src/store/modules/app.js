import * as types from '../mutations-type';

const state = {
  count: 0,
  dataGlobal: {},
  userDataGlobal: {}
}

const mutations = {
  mutationsChangeDataGlobal(state, obj = {}) {
    return (state.dataGlobal = obj)
  },
  mutationsChangeUserDataGlobal(state, obj = {}) {
    return (state.userDataGlobal = obj)
  }
}

const actions = {
  actionsChangeAppDataGlobal ({ commit }, obj = {}) {
    return commit('mutationsChangeDataGlobal', obj)
  },
  actionsChangeUserDataGlobal ({ commit }, obj = {}) {
    return commit('mutationsChangeUserDataGlobal', obj)
  }
}

const getters = {
  getterCount(state) {
    return (state.count += 10)
  }
}

const app = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default app
