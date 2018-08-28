import Vue from 'vue'
import Vuex from 'vuex'
import contributions from './modules/contributions'
import news from './modules/news'
import meetups from './modules/meetups'
import downloads from './modules/downloads'
import { database, auth } from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { firebaseMutations } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    contributions,
    news,
    downloads,
    meetups
  },
  state: {
    user: null,
    isAdmin: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    clearUser(state) {
      state.user = null
    },
    setAdmin(state, admin) {
      state.isAdmin = admin
    },
    ...firebaseMutations
  },
  actions: {
    isAdmin({ commit }, user) {
      var ref = user ? user.uid : ''
      database()
        .ref('admins/' + ref)
        .once('value')
        .then(snapshot => {
          commit('setAdmin', snapshot.val())
        })
        .catch(() => {
          commit('setAdmin', false)
        })
    },
    logout: () => auth().signOut()
  },
  getters: {
    isAdmin: state => state.isAdmin
  }
})
