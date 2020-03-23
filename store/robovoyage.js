import { db } from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'

const robovoyageRef = db.ref('robovoyage')

export const state = () => ({
  robovoyage: {}
})

export const actions = {
  setRobovoyageRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('robovoyage', robovoyageRef)
  })
}
