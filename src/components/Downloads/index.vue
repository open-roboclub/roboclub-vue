<template>
  <v-container fluid>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 md10 lg8 xl6 offset-md1 offset-lg2 offset-xl3>
        <v-card color="cyan">
          <v-card-title primary-title>
            <h3 class="headline mb-0 white--text">Downloads</h3>
          </v-card-title>
          <v-progress-linear :indeterminate="loading" v-show="loading" color="cyan" background-color="cyan lighten-3"></v-progress-linear>
          <v-tabs color="cyan" dark slider-color="yellow" v-model="active">
            <v-tab v-for="tab in downloadTypes" :key="tab" :href="'#' + tab" ripple>
                {{ tab }}
            </v-tab>
            <v-tab-item
              v-for="download in downloads"
              :key="download.name"
              :id="download.name">
            <DownloadTab
              :headers="headers"
              :download="download" />
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    DownloadTab: () => import('./Tab')
  },
  data() {
    return {
      loading: true,
      active: null,
      headers: [
        {
          text: 'File',
          value: 'file'
        },
        { text: 'Name', value: 'name' },
        { text: 'File Size', value: 'size' },
        { text: 'URL', value: 'url' }
      ]
    }
  },
  computed: {
    ...mapGetters('downloads', ['downloadTypes']),
    ...mapState('downloads', ['downloads'])
  },
  methods: mapActions('downloads', ['setDownloadsRef']),
  created() {
    this.setDownloadsRef({
      ref: this.$firebase.database().ref('downloads'),
      callbacks: {
        readyCallback: snapshot => {
          this.loading = false
          this.active = Object.keys(snapshot.val())[0]
        },
        cancelCallback: () => {
          this.loading = false
        }
      }
    })
  }
}
</script>
