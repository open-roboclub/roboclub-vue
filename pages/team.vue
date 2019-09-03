<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" sm="6">
        <v-card color="green accent-2">
          <v-card-text class="text-center headline black--text">
            Team
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <PageLoader v-show="!members.length" />
    <v-row class="mt-2">
      <v-card
        v-for="member in members"
        :key="member['.key']"
        class="mx-auto mb-3"
        width="400"
      >
        <v-col cols="12" class="text-center">
          <v-avatar :tile="false" :size="200" color="grey lighten-4 mt-3">
            <resize-img
              :aspect-ratio="16 / 9"
              :src="member.thumbnail"
              :width="250"
              alt="Avatar"
            />
          </v-avatar>
        </v-col>
        <v-card-title>
          <v-col cols="12" class="text-center">
            <div>
              <span class="headline">{{ member.name }}</span>
              <div class="ml-2 body-2 grey--text text--darken-2">
                <span>{{ member.position }}</span>
              </div>
            </div>
          </v-col>
        </v-card-title>
        <v-col class="grey lighten-3 text-center pa-0">
          <v-btn
            v-for="(link, type) in member.links"
            :key="type"
            :color="iconColor(type)"
            class="mx-3 my-2"
            fab
            dark
            small
          >
            <a
              :href="getLink(link, type)"
              target="_blank"
              rel="noopener"
              style="text-decoration: none; color: inherit"
            >
              <v-icon dark size="18">{{ icon(type) }}</v-icon>
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
import ResizeImg from '@/components/widgets/ResizeImg.vue'

export default {
  head() {
    return {
      title: 'Team'
    }
  },
  components: { PageLoader, ResizeImg },
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
.contact {
  font-size: 35px;
}
</style>
