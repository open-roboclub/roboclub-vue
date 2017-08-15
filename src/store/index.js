import Vue from 'vue'
import Vuex from 'vuex'
import contributions from './modules/contributions'
import meetups from './modules/meetups'
import { database, auth } from 'firebase'
import {
  firebaseMutations
} from 'vuexfire'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    contributions,
    meetups
  },
  state: {
    user: null,
    isAdmin: false
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    clearUser (state) {
      state.user = null
    },
    setAdmin (state, admin) {
      state.isAdmin = admin
    },
    ...firebaseMutations
  },
  actions: {
    isAdmin ({ commit }, user) {
      var ref = user ? user.uid : ''
      database().ref('admins/' + ref).once('value')
        .then(snapshot => {
          commit('setAdmin', snapshot.val())
        }).catch(error => {
          console.log(error)
          commit('setAdmin', false)
        })
    },
    logout: () => auth().signOut()
  },
  getters: {
    isAdmin: state => state.isAdmin
  }
})
