<template>
  <v-container fluid>
    <v-row class="mb-3">
      <v-col
        cols="12"
        md="10"
        lg="8"
        xl="6"
        offset-md="1"
        offset-lg="2"
        offset-xl="3"
      >
        <v-card color="cyan">
          <v-card-title primary-title>
            <h3 class="headline mb-0 white--text">
              Downloads
            </h3>
          </v-card-title>
          <v-progress-linear
            v-show="!downloads.length"
            indeterminate
            color="cyan"
            background-color="cyan lighten-3"
          />
          <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
            <v-tab
              v-for="tab in downloadTypes"
              :key="tab"
              :href="'#' + tab"
              ripple
            >
              {{ tab }}
            </v-tab>
            <v-tab-item
              v-for="download in downloads"
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
  head() {
    return {
      title: 'Downloads'
    }
  },
  components: {
    DownloadTab: Tab
  },
  data() {
    return {
      active: null
    }
  },
  computed: {
    ...mapGetters('downloads', ['downloadTypes']),
    ...mapState('downloads', ['downloads'])
  },
  created() {
    this.setDownloadsRef()
  },
  methods: mapActions('downloads', ['setDownloadsRef'])
}
</script>
