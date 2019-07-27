import { firebaseAction } from 'vuexfire'

export const state = () => ({
  robovoyage: {}
})

export const actions = {
  setRobovoyageRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    return bindFirebaseRef('robovoyage', ref)
  })
}
