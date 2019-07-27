import { firebaseAction } from 'vuexfire'

export const state = () => ({
  downloads: []
})

export const actions = {
  setDownloadsRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    return bindFirebaseRef('downloads', ref)
  })
}

export const getters = {
  downloadTypes: state => state.downloads.map(item => item.name)
}
