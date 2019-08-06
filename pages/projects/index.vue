<template>
  <v-container>
    <v-row>
      <v-col cols="10" sm="6" offset-sm="3" offset="1">
        <v-card class="mt-0 mb-4" color="#BF3EFF">
          <v-card-text>
            <div>
              <h1 class="projects-header">
                Completed Projects
              </h1>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <Admin v-if="isAdmin" />
    <PageLoader v-show="!completedProjects.length" />
    <v-row>
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
          <v-col cols="12" class="text-center">
            <v-avatar :tile="false" :size="250" color="grey lighten-4">
              <v-img :aspect-ratio="16 / 9" :src="project.image" alt="Avatar" />
            </v-avatar>
          </v-col>
          <v-card-title>
            <v-col cols="12" class="text-center">
              <span class="headline">{{ project.name }}</span>
              <div class="d-flex">
                <div class="ml-2 grey--text text--darken-2">
                  <span>{{ project.team }}</span>
                </div>
              </div>
            </v-col>
          </v-card-title>
        </v-card>
      </v-hover>
      <div class="text-center">
        <v-dialog
          v-model="dialog"
          max-width="700"
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              {{ selectedProject.name }}
            </v-card-title>
            <v-col cols="12" class="text-center mt-2 mb-0">
              <v-avatar :tile="false" :size="225" color="grey lighten-4">
                <v-img
                  :aspect-ratio="16 / 9"
                  :src="selectedProject.image"
                  alt="Avatar"
                />
              </v-avatar>
            </v-col>
            <v-card-text>
              <p>{{ selectedProject.description }}</p>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <nuxt-link :to="projectLink" style="text-decoration: none">
                <v-btn color="green darken-1" text>
                  Know More
                </v-btn>
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
  head() {
    return {
      title: 'Projects'
    }
  },
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
