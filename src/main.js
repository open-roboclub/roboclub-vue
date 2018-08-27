import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import * as firebase from 'firebase'
import firebaseui from 'firebaseui'

import config from './firebaseconfig'

Vue.config.productionTip = false

Vue.prototype.$firebase = firebase.initializeApp(config)
Vue.prototype.$auth = firebase.auth()
Vue.prototype.$authUI = new firebaseui.auth.AuthUI(Vue.prototype.$auth)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch('isAdmin', user)
      if (user) {
        this.$store.commit('setUser', user)
      } else {
        this.$store.commit('clearUser')
      }
    })
  }
}).$mount('#app')
