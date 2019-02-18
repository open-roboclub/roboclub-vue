import { firebaseAction } from 'vuexfire'

export const state = () => ({
  robovoyage: {},
  robovoyageRef: null
})

export const mutations = {
  setRobovoyageRef: (state, robovoyageRef) => {
    state.robovoyageRef = robovoyageRef
  }
}

export const actions = {
  setRobovoyageRef: firebaseAction(
    ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
      bindFirebaseRef('robovoyage', ref, callbacks)
      commit('setRobovoyageRef', ref)
    }
  )
}
