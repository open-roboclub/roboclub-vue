<template>
  <v-container>
    <v-row>
      <PageLoader v-if="!loadedProject" />
      <v-col v-else cols="12" xl="8" offset-xl="2">
        <v-card class="d-flex flex-column">
          <v-card-title>
            {{ loadedProject.name }}
          </v-card-title>
          <v-card-text>{{ teammember }}</v-card-text>
          <v-avatar
            v-if="!loadedProject.projectImg"
            class="align-self-center"
            :tile="false"
            :size="225"
            color="grey lighten-4"
          >
            <v-img
              :aspect-ratio="16 / 9"
              :src="loadedProject.projectImg[0]"
              alt="Avatar"
            />
          </v-avatar>
          <v-carousel v-if="loadedProject.projectImg">
            <v-carousel-item
              v-for="image in loadedProject.projectImg"
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
  head() {
    return {
      title:
        'Project' + (this.loadedProject ? ': ' + this.loadedProject.name : '')
    }
  },
  computed: {
    loadedProject() {
      return this.getProjectById()(this.$route.params.id)
    },
    teammember() {
      let str = ''
      for (let i = 0; i < this.loadedProject.teamMembers.length; i++) {
        str += this.loadedProject.teamMembers[i].member + ' , '
      }
      str = str.substring(0, str.length - 2)
      return str
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
