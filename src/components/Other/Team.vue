<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs10 sm6 offset-sm3 offset-xs1>
        <v-card class="mt-0 mb-4" color="#C1FFC1">
          <v-card-text>
            <div>
              <h1 class="team-header">Team</h1>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-hover v-for="(member, index) in team" :key="index" class="mb-3">
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
          class="mx-auto"
          width="400"
        ><br>
        <v-flex xs12 class="text-xs-center">
          <v-avatar
            :tile="false"
            :size="200"
            color="grey lighten-4"
          >
            <v-img
              :aspect-ratio="16/9"
              :src="member.thumbnail"
              alt="Avatar"
            ></v-img>
          </v-avatar>
        </v-flex>
          <v-card-title>
            <v-flex xs12 class="text-xs-center">
              <div>
                <span class="headline">{{ member.name }}</span>
                <div class="d-flex">
                  <div class="ml-2 grey--text text--darken-2">
                    <span>{{ member.position }}</span>
                  </div>
                </div>
              </div>
            </v-flex>
          </v-card-title>
          <v-card color="#F8F8FF" v-if="!member.links">
            <v-card-text>
              <v-flex xs12 class="text-xs-center">
                <div class="ml-2 grey--text text--darken-2">
                  <span class="headline mb-0">No Contact</span>
                </div>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-card>
      </v-hover>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  metaInfo: {
    title: 'Team'
  },
  computed: {
    ...mapGetters('team', ['team'])
  },
  methods: mapActions('team', ['setTeamRef']),
  created() {
    this.setTeamRef({
      ref: this.$firebase.database().ref('team/current/members'),
      callbacks: {
        readyCallback: () => {
          this.loading = false
        },
        cancelCallback: error => {
          console.error(error)
          this.loading = false
        }
      }
    })
  },
  data() {
    return {
      loading: true,
      icons: [
        'fa-Coffee',
        'fa fa-twitter-square',
        'fa fa-google-plus-square',
        'fa fa-linkedin-square'
      ]
    }
  }
}
</script>

<style scoped>
.team-header {
  color: black;
  text-align: center;
}
</style>
