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
  for (var prop in source) {
    if (destination.hasOwnProperty(prop)) {
      destination[prop] = source[prop]
    }
  }

  return destination
}

export default {
  namespaced: true,
  state: {
    contribution: clearContribution(),
    contributions: [],
    contributionsRef: null
  },
  mutations: {
    resetContribution: state => {
      clearContribution(state.contribution)
    },
    setContribution: (state, contribution) => {
      state.contribution = Object.assign({}, contribution)
    },
    setContributionsRef: (state, contributionsRef) => {
      state.contributionsRef = contributionsRef
    }
  },
  actions: {
    setContributionsRef: firebaseAction(
      ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
        bindFirebaseRef('contributions', ref, callbacks)
        commit('setContributionsRef', ref)
      }
    ),
    deleteContribution: ({ state }, id) => {
      state.contributionsRef.child(id).remove()
    },
    addContribution: ({ state, commit }) => {
      console.log(state.contribution)
      state.contributionsRef.push(state.contribution)
      commit('resetContribution')
    },
    saveContribution: ({ state, commit }) => {
      console.log('Hello ', state.contribution)
      state.contributionsRef
        .child(state.contribution['.key'])
        .set(copyProperties(state.contribution, clearContribution()))
      commit('resetContribution')
    }
  },
  getters: {
    contributions: state => state.contributions.slice().reverse()
  }
}
