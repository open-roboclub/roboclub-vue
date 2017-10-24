import { firebaseAction } from 'vuexfire'

export default {
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
    setDownloadsRef: firebaseAction(({ commit, bindFirebaseRef }, { ref, callbacks }) => {
      bindFirebaseRef('downloads', ref, callbacks)
      commit('setDownloadsRef', ref)
    })
  },
  getters: {
    downloads: state => state.downloads,
    downloadTypes: state => state.downloads.map(item => item.name)
  }
}
