import { firestoreAction } from 'vuexfire'
import { DB } from '@/plugins/firebase'

const COORDINATORS_RANK = 1
const coreTeamRef = DB.collection('teams').doc('seZ00zSB7oAhwCc6rtGN')
const facultyTeamRef = DB.collection('teams').doc('oBN3RWaWFRu9JCMe5TDO')

export const state = () => ({
  team: {},
  faculty: {}
})

export const actions = {
  setTeamRef: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('team', coreTeamRef)
  }),
  setFacultyRef: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('faculty', facultyTeamRef)
  })
}

export const getters = {
  members: state => {
    if (!state.team || !state.faculty) return []
    else if (!state.team.members || !state.faculty.members) return []
    return [
      ...Object.values(state.faculty.members).sort((memberA, memberB) => {
        return memberA.rank - memberB.rank
      }),
      ...Object.values(state.team.members).sort((memberA, memberB) => {
        return memberA.rank - memberB.rank
      })
    ]
  },

  coordinators: state => {
    if (!state.team) return []
    else if (state.team.members) {
      return Object.values(state.team.members).filter(
        member => parseInt(member.rank) === COORDINATORS_RANK
      )
    } else {
      return []
    }
  }
}
