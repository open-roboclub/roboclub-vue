import Vue from 'vue'
import firebase from 'firebase/app'

import config from './firebaseconfig'

Vue.prototype.$firebase = firebase.initializeApp(config)

export default firebase
