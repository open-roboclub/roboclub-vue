import firebaseConfig from '~/firebaseconfig'
import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebaseConfig) {
  throw new Error('missing firebase.json config.')
}

export default function({ store }, inject) {
  inject('firebase', firebase)

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  return firebase.auth().onAuthStateChanged(user => {
    store.dispatch('isAdmin', user)
    if (user) {
      store.commit('setUser', user)
    }
  })
}
