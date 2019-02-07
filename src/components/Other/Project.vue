<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 xl8 offset-xl2 v-if="loadedProject == null">
        Loading...
      </v-flex>
      <v-flex xs12 xl8 offset-xl2 v-else>
        <v-card>
          <v-card-title>
            <div>
              <h2 class="primary--text">{{ loadedProject.name }}</h2>
              <div class="primary--text">{{ loadedProject.team }}</div>
            </div>
          </v-card-title>
          <v-flex xs12 class="text-xs-center mt-2 mb-0">
            <v-avatar
              v-if="!loadedProject.images"
              :tile="false"
              :size="225"
              color="grey lighten-4"
            >
              <v-img
                :aspect-ratio="16 / 9"
                :src="loadedProject.image"
                alt="Avatar"
              ></v-img>
            </v-avatar>
            <v-carousel v-if="loadedProject.images">
              <v-carousel-item
                v-for="image in loadedProject.images"
                :src="image"
                :key="image"
              >
              </v-carousel-item>
            </v-carousel>
          </v-flex>
          <v-card-text>
            <div>
              <p style="font-size: 18px;">{{ loadedProject.description }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  metaInfo: {
    title: 'Project'
  },
  props: ['id'],
  data() {
    return {
      loading: true
    }
  },
  computed: {
    loadedProject() {
      return this.getProjectById()(this.id)
    }
  },
  methods: {
    ...mapActions('projects', ['setProjectRef']),
    ...mapGetters('projects', ['getProjectById'])
  },
  created() {
    if (this.loadedProject == null) {
      this.setProjectRef({
        ref: this.$firebase
          .database()
          .ref('projects')
          .orderByChild('id')
          .equalTo(this.id),
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
    }
  }
}
</script>
