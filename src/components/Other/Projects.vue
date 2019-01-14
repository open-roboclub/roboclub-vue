<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs10 sm6 offset-sm3 offset-xs1>
        <v-card class="mt-0 mb-4" color="#BF3EFF">
          <v-card-text>
            <div>
              <h1 class="projects-header">Completed Projects</h1>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-hover
      v-for="project in projects"
      :key="project"
      class="mb-3"
      v-if="!project.ongoing"
      >
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
          @click="openDialog(project)"
          style="cursor: pointer"
          class="mx-auto"
          width="450"
        ><br>
        <v-flex xs12 class="text-xs-center">
          <v-avatar
            :tile="false"
            :size="250"
            color="grey lighten-4"
          >
            <v-img
              :aspect-ratio="16/9"
              :src="project.image"
              alt="Avatar"
            ></v-img>
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
        max-width="500"
        scrollable
        transition="dialog-bottom-transition"
        >
          <v-card>
            <v-card-title
            class="headline grey lighten-2"
            primary-title
            >
              {{ name }}
            </v-card-title>
            <v-flex xs12 class="text-xs-center mt-2 mb-0">
              <v-avatar
                :tile="false"
                :size="225"
                color="grey lighten-4"
              >
                <v-img
                  :aspect-ratio="16/9"
                  :src="image"
                  alt="Avatar"
                ></v-img>
              </v-avatar>
            </v-flex>
            <v-card-text>
              <p>{{ description }}</p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
              color="green darken-1"
              flat
              @click="openProject(projectId)"
              >
                Amaze Me
              </v-btn>
              <v-btn
              color="primary"
              flat
              @click="dialog = false"
              >
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
import { mapState, mapActions } from 'vuex'

export default {
  metaInfo: {
    title: 'Projects'
  },
  computed: {
    ...mapState('projects', ['projects'])
  },
  methods: {
    openDialog: function(project) {
      this.dialog = true
      this.name = project.name
      this.image = project.image
      this.id = project.id
      if (project.description == '') {
        this.description = 'No description'
      } else {
        this.description = project.description
      }
    },
    openProject: function () {
      this.$router.push('/projects/' + this.id)
    },
    ...mapActions('projects', ['setProjectsRef'])
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
  data() {
    return {
      loading: true,
      dialog: false,
      name: '',
      description: '',
      image: '',
      id: ''
    }
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
