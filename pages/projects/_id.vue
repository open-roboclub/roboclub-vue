<template>
  <v-container>
    <v-row>
      <PageLoader v-if="!loadedProject" />
      <v-col v-else cols="12" xl="8" offset-xl="2">
        <v-card>
          <v-card-title>
            <div>
              <h2 class="primary--text">
                {{ loadedProject.name }}
              </h2>
              <div class="primary--text">
                {{ loadedProject.team }}
              </div>
            </div>
          </v-card-title>
          <v-col cols="12" class="text-center mt-2 mb-0">
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
              />
            </v-avatar>
            <v-carousel v-if="loadedProject.images">
              <v-carousel-item
                v-for="image in loadedProject.images"
                :key="image"
                :src="image"
              />
            </v-carousel>
          </v-col>
          <v-card-text>
            <div>
              <p style="font-size: 18px;">
                {{ loadedProject.description }}
              </p>
            </div>
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
  head() {
    return {
      title:
        'Project' + (this.loadedProject ? ': ' + this.loadedProject.name : '')
    }
  },
  components: { PageLoader },
  computed: {
    loadedProject() {
      return this.getProjectById()(this.$route.params.id)
    }
  },
  created() {
    this.setProjectRef(this.$route.params.id)
  },
  methods: {
    ...mapActions('projects', ['setProjectRef']),
    ...mapGetters('projects', ['getProjectById'])
  }
}
</script>
