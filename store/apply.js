import { firebaseAction } from 'vuexfire'
import { db } from '@/plugins/firebase'

const membersRef = db.ref('members/memberList')
const registrationNumbersRef = db.ref('members/registrationNumbers')

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
  member.registrationNumber = ''

  return member
}

const getRegistrationNumber = number => {
  const date = new Date()
  const currentMonth = date.getUTCMonth() + 1
  const currentYear = date.getUTCFullYear()
  const admissionYear = parseInt('20' + number[0] + number[1])

  let year = currentYear - admissionYear
  if (currentMonth > 8) year += 1

  return (
    'R' +
    (currentYear % 100).toString() +
    year.toString() +
    number[5] +
    number[6] +
    number[7]
  )
}

export const state = () => ({
  members: [],
  memberToBeAdded: clearMember(),
  memberToBeEdited: clearMember()
})

export const mutations = {
  resetMember: state => clearMember(state.memberToBeAdded),
  resetMemberEdit: state => clearMember(state.memberToBeEdited),
  setMemberToEdit: (state, payload) => {
    state.memberToBeEdited = payload
  }
}

export const actions = {
  setMembersRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('members', membersRef)
  }),
  checkDuplicates: async ({ state }, facultyNumber) => {
    const snapshot = await registrationNumbersRef
      .child(getRegistrationNumber(facultyNumber))
      .once('value')
    try {
      if (snapshot.val() === true)
        return 'This faculty number is used by another person'
    } catch (err) {
      return ''
    }
  },
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
    state.memberToBeAdded.registrationNumber = getRegistrationNumber(
      state.memberToBeAdded.facultyNumber
    )

    await registrationNumbersRef.ref
      .child(state.memberToBeAdded.registrationNumber)
      .set(true)
    await membersRef.ref.push(state.memberToBeAdded)
    commit('resetMember')
  },
  deleteMember: (_, payload) => {
    registrationNumbersRef.ref.child(payload[1]).remove()
    membersRef.ref.child(payload[0]).remove()
  },
  editMember: async ({ state, commit }, id) => {
    const date = new Date()

    state.memberToBeEdited.timestamp = -(-date)
    state.memberToBeEdited.registrationNumber = getRegistrationNumber(
      state.memberToBeEdited.facultyNumber
    )
    await registrationNumbersRef.ref
      .child(state.memberToBeEdited.registrationNumber)
      .set(true)
    await membersRef.ref.child(id).set(state.memberToBeEdited)
    commit('resetMemberEdit')
  }
}

export const getters = {
  members: state => state.members,
  member: state => state.memberToBeAdded,
  memberEdit: state => state.memberToBeEdited
}
