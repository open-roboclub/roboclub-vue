<template>
  <v-container>
    <v-layout row wrap v-for="proj in project" :key="proj.name">
      <v-flex xs12 xl8 offset-xl2>
        <v-card>
          <v-card-title>
            <div>
              <h2 class="primary--text">{{ proj.name }}</h2>
              <div class="primary--text">{{ proj.team }}</div>
            </div>
          </v-card-title>
          <v-flex xs12 class="text-xs-center mt-2 mb-0">
            <v-avatar
              v-if="!proj.images"
              :tile="false"
              :size="225"
              color="grey lighten-4"
            >
              <v-img
                :aspect-ratio="16 / 9"
                :src="proj.image"
                alt="Avatar"
              ></v-img>
            </v-avatar>
            <v-carousel v-if="proj.images">
              <v-carousel-item
                v-for="image in proj.images"
                :src="image"
                :key="image"
              >
              </v-carousel-item>
            </v-carousel>
          </v-flex>
          <v-card-text>
            <div>
              <p style="font-size: 18px;">{{ proj.description }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
    ...mapState('project', ['project'])
  },
  methods: {
    ...mapActions('project', ['setProjectRef'])
  },
  created() {
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
</script>
