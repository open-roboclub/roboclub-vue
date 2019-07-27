import { firebaseAction } from 'vuexfire'
import { db } from '@/plugins/firebase'

const roboconRef = db.ref('robocon/current')

export const state = () => ({
  robocon: {}
})

export const actions = {
  setRoboconRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('robocon', roboconRef)
  })
}
