<template>
  <v-container v-if="robovoyage !== null">
    <v-row justify="center">
      <v-col cols="10" sm="6">
        <v-card color="blue">
          <v-card-text class="text-center headline white--text">
            {{ robovoyage.title || 'RoboVoyage' }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-card>
          <v-card-text class="black--text">
            {{ robovoyage.introduction }}
          </v-card-text>
          <v-carousel>
            <v-carousel-item
              v-for="item in robovoyage.gallery"
              :key="item['.key']"
              :src="item"
            />
          </v-carousel>
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
