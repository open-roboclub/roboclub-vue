import { firebaseAction } from 'vuexfire'

export const state = () => ({
  team: {},
  teamRef: null
})

export const mutations = {
  setTeamRef: (state, teamRef) => {
    state.teamRef = teamRef
  }
}

export const actions = {
  setTeamRef: firebaseAction(
    ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
      bindFirebaseRef('team', ref, callbacks)
      commit('setTeamRef', ref)
    }
  )
}

export const getters = {
  members: state => {
    if (!state.team.members) {
      return []
    }
    return Object.values(state.team.members).sort((memberA, memberB) => {
      return memberA.rank - memberB.rank
    })
  }
}
