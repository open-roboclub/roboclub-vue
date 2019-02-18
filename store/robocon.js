import { firebaseAction } from 'vuexfire'

export const state = () => ({
  robocon: {},
  roboconRef: null
})

export const mutations = {
  setRoboconRef: (state, roboconRef) => {
    state.roboconRef = roboconRef
  }
}

export const actions = {
  setRoboconRef: firebaseAction(
    ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
      bindFirebaseRef('robocon', ref, callbacks)
      commit('setRoboconRef', ref)
    }
  )
}
