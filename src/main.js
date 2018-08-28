import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import firebase from '@/firebase'
import 'firebase/auth'

Vue.config.productionTip = false

Vue.prototype.$auth = firebase.auth()

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$auth.onAuthStateChanged(user => {
      this.$store.dispatch('isAdmin', user)
      if (user) {
        this.$store.commit('setUser', user)
      } else {
        this.$store.commit('clearUser')
      }
    })
  }
}).$mount('#app')
