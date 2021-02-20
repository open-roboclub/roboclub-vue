import { firebaseAction } from 'vuexfire'
import { db } from '@/plugins/firebase'

const membersRef = db.ref('members')

const clearMember = member => {
  if (!member) {
    member = {}
  }

  member.name = ''
  member.email = ''
  member.mobile = ''
  member.course = ''
  member.facultyNumber = ''
  member.enrollmentNumber = ''
  member.timestamp = -Date.now()
  member.paymentStatus = false

  return member
}

export const state = {
  members: [],
  memberToBeAdded: clearMember(),
  memberToBeEdited: clearMember()
}

export const mutations = {
  resetMember: state => clearMember(state.memberToBeAdded),
  resetMemberEdit: state => clearMember(state.memberToBeEdited),
  setMemberToEdit: (state, payload) => (state.memberToBeEdited = payload)
}

export const actions = {
  setMembersRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('members', membersRef)
  }),
  setMemberToEdit: ({ commit }, payload) => {
    const entry = {}
    entry.name = payload.name
    entry.email = payload.email
    entry.mobile = payload.mobile
    entry.course = payload.course
    entry.facultyNumber = payload.facultyNumber
    entry.enrollmentNumber = payload.enrollmentNumber
    entry.paymentStatus = payload.paymentStatus

    commit('setMemberToEdit', entry)
  },
  addMember: async ({ state, commit }, paymentStatus) => {
    const date = new Date()

    state.memberToBeAdded.timestamp = -(-date)
    state.memberToBeAdded.paymentStatus = paymentStatus
    state.memberToBeAdded.facultyNumber = state.memberToBeAdded.facultyNumber.toUpperCase()
    state.memberToBeAdded.enrollmentNumber = state.memberToBeAdded.enrollmentNumber.toUpperCase()
    await membersRef.ref.push(state.memberToBeAdded)
    commit('resetMember')
  },
  deleteMember: (_, id) => {
    membersRef.ref.child(id).remove()
  },
  editMember: ({ state, commit }, id) => {
    membersRef.ref.child(id).set(state.memberToBeEdited)
    commit('resetMemberEdit')
  }
}

export const getters = {
  members: state => state.members,
  member: state => state.memberToBeAdded,
  memberEdit: state => state.memberToBeEdited
}
