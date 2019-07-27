import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { firebaseMutations } from 'vuexfire'

export const strict = false

export const state = () => ({
  user: null,
  isAdmin: false
})

export const mutations = {
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
}

export const actions = {
  async isAdmin({ commit }, user) {
    const ref = user ? user.uid : ''
    try {
      const snapshot = await firebase
        .database()
        .ref('admins/' + ref)
        .once('value')
      commit('setAdmin', snapshot.val())
    } catch {
      commit('setAdmin', false)
    }
  },
  logout: () => firebase.auth().signOut()
}
