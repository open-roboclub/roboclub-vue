<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 xl8 offset-xl2>
        <v-card>
          <v-card-title>
            <div>
              <h2 class="primary--text">{{ project[0].name }}</h2>
              <div class="primary--text">{{ project[0].team }}</div>
            </div>
          </v-card-title>
          <v-flex xs12 class="text-xs-center mt-2 mb-0">
            <v-avatar
              v-if="!project[0].images"
              :tile="false"
              :size="225"
              color="grey lighten-4"
            >
              <v-img
                :aspect-ratio="16 / 9"
                :src="project[0].image"
                alt="Avatar"
              ></v-img>
            </v-avatar>
            <v-carousel v-if="project[0].images">
              <v-carousel-item
                v-for="image in project[0].images"
                :src="image"
                :key="image"
              >
              </v-carousel-item>
            </v-carousel>
          </v-flex>
          <v-card-text>
            <div>
              <p style="font-size: 18px;">{{ project[0].description }}</p>
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
    ...mapState('projects', ['project'])
  },
  methods: {
    ...mapActions('projects', ['setProjectRef'])
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
