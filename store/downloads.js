import { firestoreAction } from 'vuexfire'
import { DB } from '@/plugins/firebase'

const downloadsRef = DB.collection('downloads')

export const state = () => ({
  downloads: []
})

export const actions = {
  setDownloadsRef: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('downloads', downloadsRef)
  })
}

export const getters = {
  downloadTypes: state => state.downloads.map(item => item.name)
}
