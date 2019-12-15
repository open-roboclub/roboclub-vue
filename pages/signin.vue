<template lang="html">
  <v-container>
    <v-row v-if="user">
      <v-col
        cols="12"
        sm="8"
        lg="6"
        xl="4"
        offset-sm="2"
        offset-lg="3"
        offset-xl="4"
      >
        <v-card>
          <div class="display-1 text-center pt-3">
            You are already logged in!
          </div>
          <v-row class="mt-2 pb-2">
            <v-col cols="12" sm="6" class="text-center text-sm-right">
              <v-btn info large to="/profile" class="purple">
                Profile
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" class="text-center text-sm-left">
              <v-btn error large @click="logout">
                Logout
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-show="!user">
      <v-col
        cols="12"
        sm="8"
        lg="6"
        xl="4"
        offset-sm="2"
        offset-lg="3"
        offset-xl="4"
      >
        <v-card>
          <div class="display-1 text-center pt-3">
            Sign In or Register
          </div>
          <div id="firebaseui-auth-container" class="pt-3 pb-3" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style src="firebaseui/dist/firebaseui.css"></style>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['user']),
  mounted() {
    const firebaseui = require('firebaseui')
    const firebase = this.$firebase
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ]
    }
    const uiInstance = firebaseui.auth.AuthUI.getInstance()
    const firebaseUI =
      uiInstance !== null
        ? uiInstance
        : new firebaseui.auth.AuthUI(firebase.auth())
    firebaseUI.start('#firebaseui-auth-container', uiConfig)
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  head() {
    return {
      title: 'Sign In'
    }
  }
}
</script>
