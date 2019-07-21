import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { firebaseMutations, firebaseAction } from 'vuexfire'

export const strict = false

export const state = () => ({
  user: null,
  isAdmin: false,
  cor: {},
  corRef: null
})

export const mutations = {
  setCorRef: (state, corRef) => {
    state.corRef = corRef
  },
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
  setCorRef: firebaseAction(
    ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
      bindFirebaseRef('cor', ref, callbacks)
      commit('setCorRef', ref)
    }
  ),
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
