const state = {
  count: 0,
  widgetFormSelect: {},
  flagEntityTable: false,
  nameEntityTable: ''
}

const mutations = {
  mutationsAddCount(state, n = 0) {
    return (state.count += n)
  },
  mutationsReduceCount(state, n = 0) {
    return (state.count -= n)
  },
  mutationsChangeFormSelect(state, data = {}) {
    return (state.widgetFormSelect = data)
  },
  mutationsChangeFlagEntity(state, flag = false) {
    return (state.flagEntityTable = flag)
  },
  mutationsChangeEntityName(state, name = '') {
    return (state.nameEntityTable = name)
  }
}

const actions = {
  actionsAddCount(context, n = 0) {
    // console.log('form AddCount', context)
    return context.commit('mutationsAddCount', n)
  },
  actionsReduceCount({ commit }, n = 0) {
    return commit('mutationsReduceCount', n)
  },
  actionsChangeFormSelect({ commit }, data = {}) {
    return commit('mutationsChangeFormSelect', data)
  },
  actionsChangeEntityFlag({ commit }, flag = false) {
    // console.log('actionsChangeEntityFlag == ', flag)
    return commit('mutationsChangeFlagEntity', flag)
  },
  actionsChangeEntityName({ commit }, name = '') {
    console.log('actionsChangeEntityName== ', name)
    return commit('mutationsChangeEntityName', name)
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
