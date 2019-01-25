import { firebaseAction } from 'vuexfire'

export default {
  namespaced: true,
  state: {
    robovoyage: {},
    robovoyageRef: null
  },
  mutations: {
    setRobovoyageRef: (state, robovoyageRef) => {
      state.robovoyageRef = robovoyageRef
    }
  },
  actions: {
    setRobovoyageRef: firebaseAction(
      ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
        bindFirebaseRef('robovoyage', ref, callbacks)
        commit('setRobovoyageRef', ref)
      }
    )
  }
}
