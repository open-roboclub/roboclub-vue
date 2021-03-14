import { firestoreAction } from 'vuexfire'
import { DB } from '@/plugins/firebase'

const contributionsRef = DB.collection('contributors')
var _id = null
function clearContribution(contribution) {
  if (!contribution) {
    contribution = {}
  }
  contribution.name = ''
  contribution.amount = ''
  contribution.description = ''
  contribution.remark = ''

  return contribution
}

function copyProperties(source, destination) {
  for (const prop in source) {
    if (Object.prototype.hasOwnProperty.call(destination, prop)) {
      destination[prop] = source[prop]
    }
  }

  return destination
}

export const state = () => ({
  contribution: clearContribution(),
  contributions: []
})

export const mutations = {
  resetContribution: state => {
    clearContribution(state.contribution)
  },
  setContribution: (state, contribution) => {
    state.contribution = Object.assign({}, contribution)
    _id = contribution.id
  }
}

export const actions = {
  setContributionsRef: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('contributions', contributionsRef)
  }),
  deleteContribution: (_, id) => {
    contributionsRef.doc(id).delete()
  },
  addContribution: ({ state, commit }) => {
    contributionsRef.add(state.contribution)
    commit('resetContribution')
  },
  saveContribution: ({ state, commit }) => {
    contributionsRef
      .doc(_id)
      .update(copyProperties(state.contribution, clearContribution()))
    commit('resetContribution')
  }
}

export const getters = {
  contributions: state => state.contributions.slice().reverse()
}
