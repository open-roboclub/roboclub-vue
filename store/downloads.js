import { db } from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'

const downloadsRef = db.ref('downloads')

export const state = () => ({
  downloads: []
})

export const actions = {
  setDownloadsRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('downloads', downloadsRef)
  })
}

export const getters = {
  downloadTypes: state => state.downloads.map(item => item.name)
}
