import { mapState } from 'vuex'

export default {
  namespaced: true,
  computed: {
    ...mapState('projects', ['projects'])
  },
  mutations: {
    setRoboconRef: (state, roboconRef) => {
      state.roboconRef = roboconRef
    }
  },
  getters: {
    projects: state => {
     if (!state.team.members) {
       return []
     }
     return projects..sort((memberA, memberB) => {
       return memberA.rank - memberB.rank
     })
   }
  }
}
