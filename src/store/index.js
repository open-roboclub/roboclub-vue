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
    isAdmin: false,
    items: [
      {
        imageUrl:
          'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.G880D3i3lPayK7rxr4bQDwHaE6%26pid%3D15.1&f=1',
        id: 'dkjcbdjkc'
      },
      {
        imageUrl:
          'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FIska65C1kZ8%2Fmaxresdefault.jpg&f=1',
        id: 'jkbckjec'
      }
    ]
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
      const ref = user ? user.uid : ''
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
    imgItems: state => {
      return state.items
    }
  }
})
