const state = {
  count: 0,
  userInfo: {}
}

const mutations = {
  mutationsAddCount(state, n = 0) {
    return (state.count += n)
  },
  mutationsReduceCount(state, n = 0) {
    return (state.count -= n)
  },
  mutationsChangeUserInfo(state, obj = {}) {
    return (state.userInfo = obj)
  }
}

const actions = {
  actionsAddCount(context, n = 0) {
    console.log(context)
    return context.commit('mutationsAddCount', n)
  },
  actionsReduceCount({ commit }, n = 0) {
    return commit('mutationsReduceCount', n)
  },
  actionsChangeUserInfo ({ commit }, obj = {}) {
    return commit('mutationsChangeUserInfo', obj)
  }
}

const getters = {
  getterCount(state) {
    return (state.count += 10)
  }
}

const user = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default user
