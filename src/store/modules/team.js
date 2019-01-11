import { firebaseAction } from 'vuexfire'

export default {
  namespaced: true,
  state: {
    team: [],
    teamRef: null
  },
  mutations: {
    setTeamRef: (state, teamRef) => {
      state.teamRef = teamRef
    }
  },
  actions: {
    setTeamRef: firebaseAction(
      ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
        bindFirebaseRef('team', ref, callbacks)
        commit('setTeamRef', ref)
      }
    )
  },
  getters: {
    team: state => {
      return state.team.sort((memberA, memberB) => {
        return memberA.rank > memberB.rank
      })
    }
  }
}
