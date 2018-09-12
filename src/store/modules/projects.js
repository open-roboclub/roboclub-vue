import { firebaseAction } from 'vuexfire'
import * as firebase from 'firebase'

export default {
	state: {
		projects: [],
		projectsRef : null
	},
	mutations: {
		setProjectsRef:(state, payload) => {
			state.projectsRef = payload
		}
	},
	actions: {
		projects: firebaseAction(({ commit, bindFirebaseRef}, {ref, callbacks})=>{
			bindFirebaseRef('projects', ref, callbacks)
			commit('setProjectsRef', ref)
		})
	},
	getters: {
		projects:state => state.projects
		}
	
}