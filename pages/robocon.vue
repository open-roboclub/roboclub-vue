<template>
  <v-container v-if="robocon !== null">
    <v-row justify="center">
      <v-col cols="10" sm="6">
        <v-card color="blue darken-2">
          <v-card-text class="text-center headline white--text">
            {{ robocon.title || 'Robocon' }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-card class="mb-3">
          <v-card-title class="success white--text text-sm-center text-md-left">
            Introduction
          </v-card-title>

          <v-img :src="robocon.image" aspect-ratio="2.75" />

          <v-card-text class="black--text">
            {{ robocon.introduction }}
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title class="cyan accent-2"> Our Sponsors </v-card-title>

          <v-card-text class="cyan accent-2 black--text">
            Thanks for your support!
          </v-card-text>

          <v-carousel>
            <v-carousel-item
              v-for="item in robocon.sponsors"
              :key="item['.key']"
              :src="item.image"
            >
              <div class="sponsor--title pa-4 white--text">
                {{ item.name }}
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <v-card class="mb-3">
          <v-carousel>
            <v-carousel-item
              v-for="item in robocon.gallery"
              :key="item['.key']"
              :src="item"
            />
          </v-carousel>
        </v-card>

        <v-card>
          <v-card-title class="grey lighten-2 text-sm-center md-right">
            About
          </v-card-title>
          <v-card-text class="black--text pt-4">
            {{ robocon.about }}
          </v-card-text>
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
      title: 'Robocon'
    }
  },
  computed: {
    ...mapState('robocon', ['robocon'])
  },
  created() {
    this.setRoboconRef()
  },
  methods: mapActions('robocon', ['setRoboconRef'])
}
</script>

<style scoped>
.sponsor--title {
  position: absolute;
  bottom: 50px;
  background-color: rgb(0, 0, 0, 0.5);
  left: 50%;
  transform: translateX(-50%);
}
</style>
