<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 xl8 offset-xl2>
        <v-card>
          <v-card-title>
            <div>
              <h2 class="primary--text">{{ project.name }}</h2>
              <div class="primary--text">{{ project.team }}</div>
            </div>
          </v-card-title>
          <v-flex xs12 class="text-xs-center mt-2 mb-0">
            <v-avatar
              v-if="!project.images"
              :tile="false"
              :size="225"
              color="grey lighten-4"
            >
              <v-img
                :aspect-ratio="16/9"
                :src="project.image"
                alt="Avatar"
              ></v-img>
            </v-avatar>
            <v-carousel v-if="project.images">
              <v-carousel-item
                v-for="image in project.images"
                :src="image"
                :key="image"
              >
              </v-carousel-item>
            </v-carousel>
          </v-flex>
          <v-card-text>
            <div>
              <p style="font-size: 18px;">{{ project.description }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  metaInfo: {
    title: 'Project'
  },
  methods: {
    ...mapGetters('projects', ['getProjectById'])
  },
  computed: {
    project() {
      return this.getProjectById()(this.id)
    }
  },
  props: ['id'],
  data() {
    return {
      loading: true
    }
  }
}
</script>
