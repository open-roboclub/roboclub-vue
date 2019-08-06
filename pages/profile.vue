<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" xl="3">
        <v-card v-if="user">
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img :src="user.photoURL" alt="Profile Picture" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ user.displayName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider />

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-email</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ user.email }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action v-if="user.emailVerified">
                <v-icon color="green">mdi-check-decagram</v-icon>
              </v-list-item-action>
            </v-list-item>

            <v-divider />

            <v-list-item ripple @click="logoutAndRedirect">
              <v-list-item-action>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col class="text-center" cols="12" md="8" xl="9">
        <v-card :class="['profile-card', profileCardMargin]">
          <h2 class="grey--text">Coming Soon</h2>
        </v-card>
      </v-col>
    </v-row>
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
