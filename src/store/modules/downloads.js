import { firebaseAction } from 'vuexfire'

export default {
  namespaced: true,
  state: {
    downloads: [],
    downloadsRef: null
  },
  mutations: {
    setDownloadsRef: (state, newsRef) => {
      state.downloadsRef = newsRef
    }
  },
  actions: {
    setDownloadsRef: firebaseAction(
      ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
        bindFirebaseRef('downloads', ref, callbacks)
        commit('setDownloadsRef', ref)
      }
    )
  },
  getters: {
    downloadTypes: state => state.downloads.map(item => item.name)
  }
}
