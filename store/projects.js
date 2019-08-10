import { firebaseAction } from 'vuexfire'
import { db } from '@/plugins/firebase'

const projectsRef = db.ref('projects')

const getProjectRef = id => projectsRef.orderByChild('id').equalTo(id)

export const state = () => ({
  projects: [],
  project: []
})

export const actions = {
  setProjectsRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('projects', projectsRef)
  }),
  setProjectRef: firebaseAction(({ bindFirebaseRef, getters }, projectId) => {
    if (getters.getProjectById(projectId)) return // Project found
    return bindFirebaseRef('project', getProjectRef(projectId))
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
  },

  projectIsUnique(state) {
    return id => {
      for (let i = 0; i < state.projects.length; i++) {
        if (state.projects[i].id === id) {
          return false
        }
      }
      return true
    }
  }
}
