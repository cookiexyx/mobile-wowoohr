import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

const state = {
  detail: []
}

const mutations = {
  [types.GET_DETAIL] (state, list) {
    state.added = []
    state.detail = list
  }
}

const actions = {
  setDetail: ({ commit }, list) => commit(types.GET_DETAIL, list)
}

const getters = {
  list: state => state.detail
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
