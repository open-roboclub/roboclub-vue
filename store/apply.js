import { firestoreAction } from 'vuexfire'
import { DB } from '@/plugins/firebase'

const membersRef = DB.collection('members')
const facultyNumbersRef = DB.collection('facultyNumbers')

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

const getRegistrationNumber = (number, course) => {
  const date = new Date()
  const currentMonth = date.getUTCMonth() + 1
  const currentYear = date.getUTCFullYear()
  const admissionYear = parseInt('20' + number[0] + number[1])

  let coursePrefix
  switch (course) {
    case 'btech':
      coursePrefix = 'T'
      break
    case 'be':
      coursePrefix = 'E'
      break
    case 'diploma':
      coursePrefix = 'D'
      break
    case 'mtech':
      coursePrefix = 'M'
      break
    case 'na':
      coursePrefix = 'N'
      break
  }

  let year = currentYear - admissionYear
  if (currentMonth > 8) year += 1

  return (
    'R' +
    coursePrefix +
    (currentYear % 100).toString() +
    year.toString() +
    number[5] +
    number[6] +
    number[7]
  )
}

export const state = () => ({
  members: {},
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
  setMembersRef: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('members', membersRef)
  }),
  checkDuplicates: async ({ state }, facultyNumber) => {
    const snapshot = await facultyNumbersRef.doc(facultyNumber).get()
    try {
      if (snapshot.data().value === true)
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
    entry.registrationNumber = payload.registrationNumber

    commit('setMemberToEdit', entry)
  },
  addMember: async ({ state, commit }, paymentStatus) => {
    const date = new Date()
    const batch = DB.batch()

    state.memberToBeAdded.timestamp = -(-date)
    state.memberToBeAdded.paymentStatus = paymentStatus
    state.memberToBeAdded.facultyNumber = state.memberToBeAdded.facultyNumber.toUpperCase()
    state.memberToBeAdded.enrollmentNumber = state.memberToBeAdded.enrollmentNumber.toUpperCase()

    state.memberToBeAdded.registrationNumber = getRegistrationNumber(
      state.memberToBeAdded.facultyNumber,
      state.memberToBeAdded.course
    )

    batch.set(facultyNumbersRef.doc(state.memberToBeAdded.facultyNumber), {
      value: true
    })
    batch.set(membersRef.doc(), state.memberToBeAdded)
    await batch.commit()
  },
  deleteMember: async (_, payload) => {
    const batch = DB.batch()
    batch.delete(facultyNumbersRef.doc(payload[1]))
    batch.delete(membersRef.doc(payload[0]))
    await batch.commit()
  },
  editMember: async ({ state, commit }, payload) => {
    const date = new Date()
    const batch = DB.batch()

    state.memberToBeEdited.timestamp = -(-date)

    state.memberToBeEdited.registrationNumber = getRegistrationNumber(
      state.memberToBeEdited.facultyNumber,
      state.memberToBeEdited.course
    )

    if (payload[1] !== state.memberToBeEdited.facultyNumber)
      batch.delete(facultyNumbersRef.doc(payload[1]))
    batch.set(facultyNumbersRef.doc(state.memberToBeEdited.facultyNumber), {
      value: true
    })
    batch.set(membersRef.doc(payload[0]), state.memberToBeEdited)
    await batch.commit()
    commit('resetMemberEdit')
  }
}

export const getters = {
  members: (state, getters) => search => {
    return Object.values(state.members).filter(member => {
      return (
        member.name.toUpperCase().includes(search.toUpperCase()) ||
        member.facultyNumber.toUpperCase().includes(search.toUpperCase())
      )
    })
  },
  member: state => state.memberToBeAdded,
  memberEdit: state => state.memberToBeEdited
}
