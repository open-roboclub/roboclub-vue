import { firestoreAction } from 'vuexfire'
import { DB } from '@/plugins/firebase'

const roboconRef = DB.collection('robocon').doc('current')

export const state = () => ({
  robocon: {}
})

export const actions = {
  setRoboconRef: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('robocon', roboconRef)
  })
}
