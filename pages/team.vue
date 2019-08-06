<template>
  <v-container>
    <v-row>
      <v-col cols="10" sm="6" offset-sm="3" offset="1">
        <v-card class="mt-0 mb-4" color="#C1FFC1">
          <v-card-text>
            <div>
              <h1 class="team-header">
                Team
              </h1>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <PageLoader v-show="!members.length" />
    <v-row>
      <v-card
        v-for="member in members"
        :key="member['.key']"
        class="mx-auto mb-3"
        width="400"
      >
        <v-col cols="12" class="text-center">
          <v-avatar :tile="false" :size="200" color="grey lighten-4 mt-3">
            <v-img
              :aspect-ratio="16 / 9"
              :src="member.thumbnail"
              alt="Avatar"
            />
          </v-avatar>
        </v-col>
        <v-card-title>
          <v-col cols="12" class="text-center">
            <div>
              <span class="headline">{{ member.name }}</span>
              <div class="d-flex">
                <div class="ml-2 grey--text text--darken-2">
                  <span>{{ member.position }}</span>
                </div>
              </div>
            </div>
          </v-col>
        </v-card-title>
        <v-col class="grey lighten-3 text-center">
          <v-btn
            v-for="(link, type) in member.links"
            :key="type"
            :color="iconColor(type)"
            class="mx-3"
            fab
            dark
            small
          >
            <a
              :href="getLink(link, type)"
              target="_blank"
              style="text-decoration: none; color: inherit"
            >
              <v-icon dark>{{ icon(type) }}</v-icon>
            </a>
          </v-btn>
        </v-col>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PageLoader from '@/components/widgets/PageLoader.vue'

export default {
  head() {
    return {
      title: 'Team'
    }
  },
  components: { PageLoader },
  computed: {
    ...mapGetters('team', ['members'])
  },
  created() {
    this.setTeamRef()
  },
  methods: {
    iconColor(type) {
      switch (type) {
        case 'facebook':
          return 'blue darken-4'
        case 'email':
          return 'red darken-1'
        case 'g-plus':
          return 'red darken-4'
        case 'linkedin':
          return 'indigo darken-1'
        case 'mobile':
          return 'green darken-3'
        case 'twitter':
          return 'light-blue darken-1'
      }
    },
    icon(type) {
      switch (type) {
        case 'g-plus':
          return 'mdi-google-plus'
        case 'mobile':
          return 'mdi-phone'
        default:
          return `mdi-${type}`
      }
    },
    getLink(link, type) {
      if (type === 'email') {
        return 'mailto:' + link
      } else if (type === 'mobile') {
        return 'tel:' + link
      } else if (!link.startsWith('http://') && !link.startsWith('https://')) {
        return '//' + link
      }

      return link
    },
    ...mapActions('team', ['setTeamRef'])
  }
}
</script>

<style scoped>
.team-header {
  color: black;
  text-align: center;
}
.contact {
  font-size: 35px;
}
</style>
