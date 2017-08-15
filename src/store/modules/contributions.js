import { firebaseAction } from 'vuexfire'

export default {
  state: {
    contribution: {
      contributor: '',
      amount: '',
      purpose: '',
      remark: ''
    },
    contributions: [],
    contributionsRef: null
  },
  mutations: {
    resetContribution: (state) => {
      state.contribution = {
        contributor: '',
        amount: '',
        purpose: '',
        remark: ''
      }
    },
    setContribution: (state, contribution) => {
      state.contribution = contribution
    },
    setContributionsRef: (state, contributionsRef) => {
      state.contributionsRef = contributionsRef
    }
  },
  actions: {
    setContributionsRef: firebaseAction(({ commit, bindFirebaseRef }, { ref, callbacks }) => {
      bindFirebaseRef('contributions', ref, callbacks)
      commit('setContributionsRef', ref)
    }),
    deleteContribution: ({ state }, id) => {
      state.contributionsRef.child(id).remove()
    },
    addContribution: ({ state, commit }) => {
      state.contributionsRef.push(state.contribution)
      commit('resetContribution')
    },
    saveContribution: ({ state, commit }) => {
      state.contributionsRef.child(state.contribution['.key']).set({
        contributor: state.contribution.contributor,
        amount: state.contribution.amount,
        purpose: state.contribution.purpose,
        remark: state.contribution.remark
      })
      commit('resetContribution')
    }
  },
  getters: {
    contributions: state => state.contributions.slice().reverse(),
    contribution: state => state.contribution
  }
}
