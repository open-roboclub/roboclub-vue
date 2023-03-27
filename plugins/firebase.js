import firebase from 'firebase/app'
import firebaseConfig from '~/firebaseconfig'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/functions'
import 'firebase/firestore'

if (!firebaseConfig) {
  throw new Error('missing firebase.json config.')
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.database()
export const DB = firebase.firestore()

export default function ({ store }, inject) {
  inject('firebase', firebase)

  return firebase.auth().onAuthStateChanged(async user => {
    store.commit('setUser', user)
    store.dispatch('isAdmin')
    if (user) {
      const functions = firebase.functions()
      const setClaims = functions.httpsCallable('setClaims')

      const response = await setClaims()
      if (response.data.success) {
        await user.getIdToken(true)
      }
    }
  })
}
