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
      <v-hover v-for="(member, index) in members" :key="index" class="mb-3">
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
          <v-card color="#F8F8FF" v-if="member.links">
            <v-card-text>
              <v-flex xs12 class="text-xs-center">
                <v-btn
                v-for="(link, type) in member.links"
                :key="type"
                @click="openLink(link, type)"
                class="mx-3"
                icon
                >
                  <v-img size="24px" aspect-ratio="1" :src="iconUrl(type)"></v-img>
                </v-btn>
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
    ...mapGetters('team', ['members'])
  },
  methods: {
    iconUrl: function(type) {
      switch (type) {
        case 'facebook':
          return 'https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png'
          break
        case 'email':
          return 'https://cdn2.iconfinder.com/data/icons/jetflat-multimedia/90/004_009_mail_email_envelope_message-512.png'
          break
        case 'g-plus':
          return 'https://cdn0.iconfinder.com/data/icons/social-media-2091/100/social-03-512.png'
          break
        case 'linkedin':
          return 'https://cdn4.iconfinder.com/data/icons/miu-flat-social/60/linkedin-512.png'
          break
        case 'mobile':
          return 'https://cdn3.iconfinder.com/data/icons/mobile-functions/154/call-512.png'
          break
        case 'twitter':
          return 'https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png'
          break
      }
    },
    openLink: function(link, type) {
      if (
        type == 'facebook' ||
        type == 'linkedin' ||
        type == 'twitter' ||
        type == 'g-plus'
      ) {
        window.location.href = link
      } else {
        window.alert(link)
      }
    },
    ...mapActions('team', ['setTeamRef'])
  },
  created() {
    this.setTeamRef({
      ref: this.$firebase.database().ref('team/current'),
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
      loading: true
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
