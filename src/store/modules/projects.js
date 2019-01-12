import { firebaseAction } from 'vuexfire'

export default {
  namespaced: true,
  state: {
    projects: [],
    projectsRef: null
  },
  mutations: {
    setProjectsRef: (state, projectsRef) => {
      state.projectsRef = projectsRef
    }
  },
  actions: {
    setProjectsRef: firebaseAction(
      ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
        bindFirebaseRef('projects', ref, callbacks)
        commit('setProjectsRef', ref)
      }
    )
  }
}
