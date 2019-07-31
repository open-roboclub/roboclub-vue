<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md4 xl3>
        <v-card v-if="user">
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="user.photoURL" alt="Profile Picture" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ user.displayName }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider />

            <v-list-tile>
              <v-list-tile-action>
                <v-icon>mdi-email</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ user.email }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action v-if="user.emailVerified">
                <v-icon color="green">mdi-check-decagram</v-icon>
              </v-list-tile-action>
            </v-list-tile>

            <v-divider />

            <v-list-tile ripple @click="logoutAndRedirect">
              <v-list-tile-action>
                <v-icon>mdi-logout</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>Logout</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 md8 xl9 text-xs-center>
        <v-card :class="['profile-card', profileCardMargin]">
          <h2 class="grey--text">Coming Soon</h2>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user']),
    profileCardMargin() {
      const breakpoint = this.$vuetify.breakpoint.name
      return breakpoint === 'sm' || breakpoint === 'xs' ? 'my-2' : 'mx-2'
    }
  },
  methods: {
    ...mapActions(['logout']),
    logoutAndRedirect() {
      this.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.profile-card {
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
