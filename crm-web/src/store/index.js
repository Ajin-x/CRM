import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: window.sessionStorage.getItem('userData') ? JSON.parse(window.sessionStorage.getItem('userData')) : '',
    staffInfo:[]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
