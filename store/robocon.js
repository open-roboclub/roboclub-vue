import { firebaseAction } from 'vuexfire'

export const state = () => ({
  robocon: {}
})

export const actions = {
  setRoboconRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    return bindFirebaseRef('robocon', ref)
  })
}
