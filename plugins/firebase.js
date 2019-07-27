import firebase from 'firebase/app'
import firebaseConfig from '~/firebaseconfig'
import 'firebase/auth'
import 'firebase/functions'

if (!firebaseConfig) {
  throw new Error('missing firebase.json config.')
}

export default function({ store }, inject) {
  inject('firebase', firebase)

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  return firebase.auth().onAuthStateChanged(async user => {
    store.dispatch('isAdmin', user)
    if (user) {
      store.commit('setUser', user)

      const functions = firebase.functions()
      const setClaims = functions.httpsCallable('setClaims')

      const response = await setClaims()
      if (response.data.success) {
        await user.getIdToken(true)
      }
    }
  })
}
