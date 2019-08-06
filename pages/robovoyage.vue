<template>
  <v-container>
    <v-row>
      <v-col cols="10" sm="6" offset-sm="3" offset="1">
        <v-card class="mt-0 mb-3" color="#009ACD">
          <v-card-text>
            <div>
              <h1 class="robovoyage-header">
                {{ robovoyage.title || 'RoboVoyage' }}
              </h1>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
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
      </v-col>
    </v-row>
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
    this.setRobovoyageRef()
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
