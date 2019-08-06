import { firebaseAction } from 'vuexfire'
import { db } from '@/plugins/firebase'

const robovoyageRef = db.ref('robovoyage')

export const state = () => ({
  robovoyage: {}
})

export const actions = {
  setRobovoyageRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('robovoyage', robovoyageRef)
  })
}
