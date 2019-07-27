import { firebaseAction } from 'vuexfire'

export const state = () => ({
  projects: [],
  project: []
})

export const actions = {
  setProjectsRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    return bindFirebaseRef('projects', ref)
  }),
  setProjectRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    return bindFirebaseRef('project', ref)
  })
}

export const getters = {
  completedProjects(state) {
    return state.projects.reverse().filter(project => !project.ongoing)
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
