<template>
  <v-container>
    <v-row>
      <PageLoader v-if="!loadedProject" />
      <v-col v-else cols="12" xl="8" offset-xl="2">
        <v-card class="d-flex flex-column">
          <v-card-title>
            {{ loadedProject.name }}
          </v-card-title>
          <v-card-text>{{ loadedProject.team }}</v-card-text>
          <v-avatar
            v-if="!loadedProject.images"
            class="align-self-center"
            :tile="false"
            :size="225"
            color="grey lighten-4"
          >
            <v-img
              :aspect-ratio="16 / 9"
              :src="loadedProject.image"
              alt="Avatar"
            />
          </v-avatar>
          <v-carousel v-if="loadedProject.images">
            <v-carousel-item
              v-for="image in loadedProject.images"
              :key="image"
              :src="image"
            />
          </v-carousel>
          <v-card-text class="body-1 black--text">
            {{ loadedProject.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PageLoader from '@/components/widgets/PageLoader.vue'

export default {
  components: { PageLoader },
  computed: {
    loadedProject() {
      return this.getProjectById()(this.$route.params.id)
    }
  },
  created() {
    this.setProjectRef(this.$route.params.id)
  },
  head() {
    return {
      title:
        'Project' + (this.loadedProject ? ': ' + this.loadedProject.name : '')
    }
  },
  methods: {
    ...mapActions('projects', ['setProjectRef']),
    ...mapGetters('projects', ['getProjectById'])
  }
}
</script>
