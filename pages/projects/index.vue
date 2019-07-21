<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs10 sm6 offset-sm3 offset-xs1>
        <v-card class="mt-0 mb-4" color="#BF3EFF">
          <v-card-text>
            <div>
              <h1 class="projects-header">
                Completed Projects
              </h1>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <Admin v-if="isAdmin" />
    <v-layout row wrap>
      <v-hover
        v-for="project in completedProjects"
        :key="project.id"
        class="mb-3"
      >
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
          style="cursor: pointer"
          class="mx-auto"
          width="450"
          @click="openDialog(project)"
        >
          <br />
          <v-flex xs12 class="text-xs-center">
            <v-avatar :tile="false" :size="250" color="grey lighten-4">
              <v-img :aspect-ratio="16 / 9" :src="project.image" alt="Avatar" />
            </v-avatar>
          </v-flex>
          <v-card-title>
            <v-flex xs12 class="text-xs-center">
              <span class="headline">{{ project.name }}</span>
              <div class="d-flex">
                <div class="ml-2 grey--text text--darken-2">
                  <span>{{ project.team }}</span>
                </div>
              </div>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-hover>
      <div class="text-xs-center">
        <v-dialog
          v-model="dialog"
          max-width="700"
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              {{ selectedProject.name }}
            </v-card-title>
            <v-flex xs12 class="text-xs-center mt-2 mb-0">
              <v-avatar :tile="false" :size="225" color="grey lighten-4">
                <v-img
                  :aspect-ratio="16 / 9"
                  :src="selectedProject.image"
                  alt="Avatar"
                />
              </v-avatar>
            </v-flex>
            <v-card-text>
              <p>{{ selectedProject.description }}</p>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <nuxt-link :to="projectLink" style="text-decoration: none">
                <v-btn color="green darken-1" flat>
                  Know More
                </v-btn>
              </nuxt-link>
              <v-btn color="primary" flat @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: 'Projects'
    }
  },
  components: {
    Admin: () =>
      import(
        /* webpackChunkName: "project-admin" */
        '~/components/projects/Admin'
      )
  },
  data() {
    return {
      loading: true,
      dialog: false,
      selectedProject: {
        name: '',
        description: '',
        image: '',
        id: ''
      }
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
      ref: this.$firebase.database().ref('projects'),
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
