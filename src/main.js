// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import * as firebase from 'firebase'
import firebaseui from 'firebaseui'
import { store } from './store'
import { config } from './firebase-config'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.prototype.$firebase = firebase.initializeApp(config)
Vue.prototype.$auth = firebase.auth()
Vue.prototype.$authUI = new firebaseui.auth.AuthUI(Vue.prototype.$auth)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.dispatch('isAdmin', user)
      if (user) {
        this.$store.commit('setUser', user)
      } else {
        this.$store.commit('clearUser')
      }
    })
  }
})
