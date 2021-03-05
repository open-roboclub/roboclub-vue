import { firestoreAction } from 'vuexfire'
import { DB } from '@/plugins/firebase'

const coreTeamRef = DB.collection('teams').where('teamName', '==', 'Core Team')
const facultyTeamRef = DB.collection('teams').where('teamName', '==', 'Faculty')

export const state = () => ({
  team: [],
  facultyTeam: [],
  fullTeam: [],
  coordinators: []
})

export const actions = {
  setCoreTeamRef: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('team', coreTeamRef)
  }),
  setFacultyTeamRef: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('facultyTeam', facultyTeamRef)
  }),

  setCoordinatorsRef: () => {
    if (getters.coordinators.length)
      // Already loaded. Ignore
      return

    return state.coordinators
  }
}

export const getters = {
  members: state => {
    if (state.team.length === 0 || state.facultyTeam.length === 0) {
      return []
    } else {
      state.fullTeam.push(...state.facultyTeam[0].members)
      state.fullTeam.push(...state.team[0].members)
      return Object.values(state.fullTeam).sort((memberA, memberB) => {
        return memberA.rank - memberB.rank
      })
    }
  },

  coordinators: state => {
    if (state.coordinators.length) {
      return state.coordinators
    } else if (state.team.length) {
      return Object.values(state.team[0].members).filter(
        member => member.rank === '1'
      )
    } else {
      return []
    }
  }
}
