<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs10 sm6 offset-sm3 offset-xs1>
        <v-card class="mt-0 mb-3" color="#009ACD">
          <v-card-text>
            <div>
              <h1 class="robovoyage-header">
                {{ robovoyage.title || 'RoboVoyage' }}
              </h1>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <v-card>
          <v-card>
            <v-card-title primary-title>
              {{ robovoyage.introduction }}
            </v-card-title>
          </v-card>
          <v-card>
            <v-carousel>
              <v-carousel-item
                v-for="item in robovoyage.gallery"
                :key="item['.key']"
                :src="item"
              />
            </v-carousel>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  head() {
    return {
      title: 'RoboVoyage'
    }
  },
  computed: {
    ...mapState('robovoyage', ['robovoyage'])
  },
  created() {
    this.setRobovoyageRef({
      ref: this.$firebase.database().ref('robovoyage')
    })
  },
  methods: mapActions('robovoyage', ['setRobovoyageRef'])
}
</script>

<style scoped>
.robovoyage-header {
  color: white;
  text-align: center;
}
</style>
