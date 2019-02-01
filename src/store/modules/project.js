import { firebaseAction } from 'vuexfire'

export default {
  namespaced: true,
  state: {
    project: [],
    projectRef: null
  },
  mutations: {
    setProjectRef: (state, projectRef) => {
      state.projectRef = projectRef
    }
  },
  actions: {
    setProjectRef: firebaseAction(
      ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
        bindFirebaseRef('project', ref, callbacks)
        commit('setProjectRef', ref)
      }
    )
  }
}
