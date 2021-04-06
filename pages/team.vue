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
      <v-hover v-for="member in members" :key="member['.key']" class="mt-3">
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2} text-center mx-auto mb-3`"
          style="cursor: pointer"
          width="400"
          @click="openDialog(member)"
        >
          <v-col cols="12" class="text-center">
            <v-avatar :tile="false" :size="200" color="grey lighten-4 mt-3">
              <resize-img
                :aspect-ratio="16 / 9"
                :src="member.profileImageUrl"
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
      </v-hover>
      <div v-if="selectedMember.uid" class="text-center">
        <v-dialog
          v-model="dialog"
          max-width="700"
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-card-title class="headline grey lighten-2 text">
              {{ selectedMember.name }}
            </v-card-title>

            <v-col cols="12" class="text-center mt-2 mb-0">
              <v-avatar :tile="false" :size="225" color="grey lighten-4">
                <v-img
                  :aspect-ratio="16 / 9"
                  :src="selectedMember.profileImageUrl"
                  alt="Avatar"
                />
              </v-avatar>
            </v-col>
            <v-col cols="12" class="text-center">
              <span class="green accent-3 px-8 py-3 mx-5 round">
                {{ selectedMember.position }}
              </span>
              <v-card-text class="subtitle-1 black--text mt-2 pb-0">
                <p class="batch">
                  {{ selectedMember.profile_info.batch }}
                </p>
              </v-card-text>
            </v-col>
            <v-col cols="12" class="text-center pt-0">
              <v-card class="mx-auto" max-width="400" tile>
                <v-card color="light-blue accent-1">
                  <v-card-text class="text-center title black--text py-3">
                    About
                  </v-card-text>
                </v-card>
                <v-list-item>
                  <v-list-item-content class="pb-0 mt-2">
                    <p>
                      {{ selectedMember.profile_info.about }}
                    </p>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
              <v-card class="mx-auto" max-width="400" tile>
                <v-card color="red accent-1 mb-4 mt-8">
                  <v-card-text class="text-center title black--text py-3">
                    Interests
                  </v-card-text>
                </v-card>
                <v-list-item>
                  <v-list-item-content class="text-left">
                    <li
                      v-for="item in selectedMember.profile_info.interests"
                      :key="item.id"
                      class="mb-2"
                    >
                      {{ item }}
                    </li>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
              <v-btn
                :href="selectedMember.profile_info.cv"
                color="purple"
                class="mt-5 py-6 px-9 white--text title"
                target="_blank"
              >
                CV/Resume
              </v-btn>
            </v-col>

            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" text @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PageLoader from '@/components/widgets/PageLoader.vue'
import ResizeImg from '@/components/widgets/ResizeImg.vue'

export default {
  components: { PageLoader, ResizeImg },
  data() {
    return {
      dialog: false,
      selectedMember: {}
    }
  },
  head() {
    return {
      title: 'Team'
    }
  },
  computed: {
    ...mapGetters('team', ['members'])
  },
  created() {
    this.setTeamRef()
    this.setFacultyRef()
  },
  methods: {
    openDialog(member) {
      this.dialog = true
      this.selectedMember = member
    },
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
    ...mapActions('team', ['setTeamRef', 'setFacultyRef'])
  }
}
</script>

<style scoped>
.contact {
  font-size: 35px;
}
.round {
  border-radius: 30px;
  color: darkslategrey;
}
.batch {
  font-size: 1.15rem;
}
</style>
