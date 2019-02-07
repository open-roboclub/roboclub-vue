import { firebaseAction } from 'vuexfire'

export default {
  namespaced: true,
  state: {
    projects: [],
    projectsRef: null,
    project: [],
    projectRef: null
  },
  mutations: {
    setProjectsRef: (state, projectsRef) => {
      state.projectsRef = projectsRef
    },
    setProjectRef: (state, projectRef) => {
      state.projectRef = projectRef
    }
  },
  actions: {
    setProjectsRef: firebaseAction(
      ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
        bindFirebaseRef('projects', ref, callbacks)
        commit('setProjectsRef', ref)
      }
    ),
    setProjectRef: firebaseAction(
      ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
        bindFirebaseRef('project', ref, callbacks)
        commit('setProjectRef', ref)
      }
    )
  },
  getters: {
    completedProjects(state) {
      return state.projects.filter(project => !project.ongoing)
    },

    getProjectById(state) {
      return id => {
        const projects = state.projects.find(project => project.id === id)

        if (projects && projects.length) {
          return projects[0]
        } else if (state.project.length && state.project[0].id === id) {
          return state.project[0]
        } else {
          return null
        }
      }
    }
  }
}
