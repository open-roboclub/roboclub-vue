import { firebaseAction } from 'vuexfire'

export default {
  namespaced: true,
  state: {
    robocon: {},
    roboconRef: null
  },
  mutations: {
    setRoboconRef: (state, roboconRef) => {
      state.roboconRef = roboconRef
    }
  },
  actions: {
    setRoboconRef: firebaseAction(
      ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
        bindFirebaseRef('robocon', ref, callbacks)
        commit('setRoboconRef', ref)
      }
    )
  }
}
