import { firebaseAction } from 'vuexfire'

export const state = () => ({
  downloads: [],
  downloadsRef: null
})

export const mutations = {
  setDownloadsRef: (state, newsRef) => {
    state.downloadsRef = newsRef
  }
}

export const actions = {
  setDownloadsRef: firebaseAction(
    ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
      bindFirebaseRef('downloads', ref, callbacks)
      commit('setDownloadsRef', ref)
    }
  )
}

export const getters = {
  downloadTypes: state => state.downloads.map(item => item.name)
}
