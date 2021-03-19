import { firestoreAction } from 'vuexfire'
import { DB } from '@/plugins/firebase'

const projectsRef = DB.collection('projects')

const getProjectRef = id => projectsRef.doc(id)

export const state = () => ({
  projects: [],
  project: []
})

export const actions = {
  setProjectsRef: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('projects', projectsRef)
  }),
  setProjectRef: firestoreAction(({ bindFirestoreRef, getters }, projectId) => {
    if (getters.getProjectById(projectId)) return // Project found
    return bindFirestoreRef('project', getProjectRef(projectId))
  })
}

export const getters = {
  completedProjects(state) {
    return state.projects.reverse().filter(project => !project.ongoing)
  },

  getProjectById(state) {
    return id => {
      const projects = state.projects.find(project => project.id === id)
      return projects
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
