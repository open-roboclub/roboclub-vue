<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-card color="cyan">
          <v-card-title class="text-center headline white--text">
            sat
          </v-card-title>
          <v-progress-linear
            v-show="!sat.length"
            indeterminate
            color="cyan"
            background-color="cyan lighten-3"
          />
          <v-tabs
            v-model="active"
            background-color="cyan"
            dark
            slider-color="yellow"
            show-arrows
          >
            <v-tab
              v-for="tab in downloadTypes"
              :key="tab"
              :href="'#' + tab"
              ripple
              class="white--text"
            >
              {{ tab }}
            </v-tab>
            <v-tab-item
              v-for="download in sat"
              :key="download.name"
              :value="download.name"
            >
              <DownloadTab :download="download" />
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Tab from '~/components/download/Tab'

export default {
  components: {
    DownloadTab: Tab
  },
  data() {
    return {
      active: null
    }
  },
  head() {
    return {
      title: 'sat'
    }
  },
  computed: {
    ...mapGetters('sat', ['downloadTypes']),
    ...mapState('sat', ['sat'])
  },
  created() {
    this.setsatRef()
  },
  methods: mapActions('sat', ['setsatRef'])
}
</script>
