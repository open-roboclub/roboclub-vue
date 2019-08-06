import { firebaseAction } from 'vuexfire'
import { db } from '@/plugins/firebase'

const COORDINATORS_RANK = 30
const teamRef = db.ref('team/current')
const coordinatorsRef = teamRef
  .child('members')
  .orderByChild('rank')
  .equalTo(COORDINATORS_RANK)

export const state = () => ({
  team: {},
  coordinators: []
})

export const actions = {
  setTeamRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('team', teamRef)
  }),

  setCoordinatorsRef: firebaseAction(({ getters, bindFirebaseRef }) => {
    if (getters.coordinators.length)
      // Already loaded. Ignore
      return
    return bindFirebaseRef('coordinators', coordinatorsRef)
  })
}

export const getters = {
  members: state => {
    if (!state.team.members) {
      return []
    }
    return Object.values(state.team.members).sort((memberA, memberB) => {
      return memberA.rank - memberB.rank
    })
  },

  coordinators: state => {
    if (state.coordinators.length) {
      return state.coordinators
    } else if (state.team.members) {
      return Object.values(state.team.members).filter(
        member => parseInt(member.rank) === 30
      )
    } else {
      return []
    }
  }
}
