import { firebaseAction } from 'vuexfire'

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
  setContributionsRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    return bindFirebaseRef('contributions', ref)
  }),
  deleteContribution: ({ state }, id) => {
    state.contributionsRef.child(id).remove()
  },
  addContribution: ({ state, commit }) => {
    state.contributionsRef.push(state.contribution)
    commit('resetContribution')
  },
  saveContribution: ({ state, commit }) => {
    state.contributionsRef
      .child(state.contribution['.key'])
      .set(copyProperties(state.contribution, clearContribution()))
    commit('resetContribution')
  }
}

export const getters = {
  contributions: state => state.contributions.slice().reverse()
}
