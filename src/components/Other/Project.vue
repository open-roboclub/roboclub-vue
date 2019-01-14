<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 xl8 offset-xl2>
        <v-card>
          <v-card-title v-for="project in projects" :key="project">
            <h6 class="primary--text">{{ id }}</h6>
          </v-card-title>
          <v-card-text>
            <div class="info--text">Aligarh</div>
            <div>
              Description
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  metaInfo: {
    title: 'Single Project'
  },
  props: ['id'],
  data() {
    return {
      loading: true
    }
  }
}
</script>
