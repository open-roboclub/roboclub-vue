<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs10 sm6 offset-sm3 offset-xs1>
        <v-card class="mt-0 mb-3" color="rgb(77, 77, 255)">
          <v-card-text>
            <div>
              <h1 class="robocon-header">{{ robocon.title || 'Robocon' }}</h1>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6 class="text-sm-center text-md-left">
        <v-card>
          <v-card color="success">
            <v-card-title primary-title>
              <div>
                <h1 class="heading mb-0" style="color: white;">Introduction</h1>
              </div>
            </v-card-title>
          </v-card>
          <v-card>
            <v-img :src="robocon.image" aspect-ratio="2.75"></v-img>
          </v-card>
          <v-card class="mb-3">
            <v-card-text>
              <div>{{ robocon.introduction }}</div>
            </v-card-text>
          </v-card>
          <v-card color="#00FFFF">
            <v-card-title primary-title>
              <div>
                <div class="headline #000080--text">Our Sponsors</div>
                <span class="#000080--text text--lighten-3">
                  Thanks for your support!
                </span>
              </div>
            </v-card-title>
          </v-card>
          <v-card>
            <v-carousel>
                <v-carousel-item
                  v-for="item in robocon.sponsors"
                  :key="item"
                  :src="item.image"
                > 
                  <div class="title">
                    {{ item.name }}
                  </div>
                </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md6 class="text-sm-center md-right">
        <v-card class="ml-3">
          <v-card class="mb-3">
            <v-carousel>
              <v-carousel-item
                v-for="item in robocon.gallery"
                :key="item"
                :src="item"
              >
              </v-carousel-item>
            </v-carousel>
          </v-card>
          <v-card color="rgb(211, 211, 211)">
            <v-card-title primary-title>
              <div><h1 class="heading mb-0">About</h1></div>
            </v-card-title>
          </v-card>
          <v-card>
            <v-card-text>
              <div>{{ robocon.about }}</div>
            </v-card-text>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  metaInfo: {
    title: 'Robocon'
  },
  computed: {
    ...mapState('robocon', ['robocon'])
  },
  methods: mapActions('robocon', ['setRoboconRef']),
  created() {
    this.setRoboconRef({
      ref: this.$firebase.database().ref('robocon/current'),
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
  },
  data() {
    return {
      loading: true
    }
  }
}
</script>

<style scoped>
.robocon-header {
  color: white;
  text-align: center;
}
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgb(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
}
</style>
