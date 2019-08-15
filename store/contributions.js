import { firebaseAction } from 'vuexfire'
import { db } from '@/plugins/firebase'

const contributionsRef = db.ref('contribution')

function clearContribution(contribution) {
  if (!contribution) {
    contribution = {}
  }
  contribution.contributor = ''
  contribution.amount = ''
  contribution.purpose = ''
  contribution.remark = ''

  return contribution
}

function copyProperties(source, destination) {
  for (const prop in source) {
    if (destination.hasOwnProperty(prop)) {
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
  }
}

export const actions = {
  setContributionsRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('contributions', contributionsRef)
  }),
  deleteContribution: (_, id) => {
    contributionsRef.child(id).remove()
  },
  addContribution: ({ state, commit }) => {
    contributionsRef.push(state.contribution)
    commit('resetContribution')
  },
  saveContribution: ({ state, commit }) => {
    contributionsRef
      .child(state.contribution['.key'])
      .set(copyProperties(state.contribution, clearContribution()))
    commit('resetContribution')
  }
}

export const getters = {
  contributions: state => state.contributions.slice().reverse()
}
