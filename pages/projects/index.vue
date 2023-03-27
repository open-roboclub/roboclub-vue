<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="purple white--text">
          <div class="text-center headline pt-4 pb-4">Completed Projects</div>
        </v-card>
      </v-col>
    </v-row>
    <Admin v-if="isAdmin" />
    <PageLoader v-show="!completedProjects.length" />
    <v-row class="mb-3">
      <v-hover
        v-for="project in completedProjects"
        :key="project.id"
        class="mt-3"
      >
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2} text-center`"
          style="cursor: pointer"
          class="mx-auto"
          width="450"
          @click="openDialog(project)"
        >
          <br />
          <v-avatar :tile="false" :size="250" color="grey lighten-4">
            <v-img
              :aspect-ratio="16 / 9"
              :src="project.projectImg[0]"
              alt="Avatar"
            />
          </v-avatar>
          <div class="mt-3 headline text-center">
            {{ project.name }}
          </div>
          <v-card-text class="mx-2 grey--text text--darken-2">
            {{ project.teamMembers[0].member }}
          </v-card-text>
        </v-card>
      </v-hover>
      <div class="text-center">
        <v-dialog
          v-model="dialog"
          max-width="700"
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-card-title class="headline grey lighten-2">
              {{ selectedProject.name }}
            </v-card-title>
            <v-col
              v-if="selectedProject.projectImg"
              cols="12"
              class="text-center mt-2 mb-0"
            >
              <v-avatar :tile="false" :size="225" color="grey lighten-4">
                <v-img
                  :aspect-ratio="16 / 9"
                  :src="selectedProject.projectImg[0]"
                  alt="Avatar"
                />
              </v-avatar>
            </v-col>
            <v-card-text class="body-1 black--text font-weight-regular">
              {{ selectedProject.description }}
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <nuxt-link :to="projectLink" style="text-decoration: none">
                <v-btn color="green darken-1" text> Know More </v-btn>
              </nuxt-link>
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
import { mapState, mapActions, mapGetters } from 'vuex'
import PageLoader from '@/components/widgets/PageLoader.vue'

export default {
  components: {
    PageLoader,
    Admin: () =>
      import(
        /* webpackChunkName: "project-admin" */
        '~/components/projects/Admin'
      )
  },
  data() {
    return {
      dialog: false,
      selectedProject: {
        name: '',
        description: '',
        image: '',
        id: ''
      }
    }
  },
  head() {
    return {
      title: 'Projects'
    }
  },
  computed: {
    projectLink() {
      return '/projects/' + this.selectedProject.id
    },
    ...mapState(['isAdmin']),
    ...mapState('projects', ['projects']),
    ...mapGetters('projects', ['completedProjects'])
  },
  created() {
    this.setProjectsRef({
      ref: this.$firebase.database().ref('projects')
    })
  },
  methods: {
    openDialog(project) {
      this.dialog = true
      this.selectedProject = project
    },
    ...mapActions('projects', ['setProjectsRef'])
  }
}
</script>

<style scoped>
.projects-header {
  color: white;
  text-align: center;
}
p {
  font-size: 18px;
}
</style>
