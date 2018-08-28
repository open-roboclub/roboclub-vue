<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 sm10 md8 lg6 offset-sm1 offset-md2 offset-lg3>
        <v-card class="blue-grey white--text">
          <div class="text-xs-center headline pt-4 pb-4">News Panel</div>
          <v-progress-linear :indeterminate="loading" v-show="loading" color="blue-grey" background-color="blue-grey lighten-3"></v-progress-linear>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="mt-2"></div>

    <Admin
      :selectedToEdit.sync="selectedToEdit"
      :selectedToDelete.sync="selectedToDelete"
      v-if="isAdmin" />

    <v-layout row>
      <v-flex xs12 sm10 md8 lg6 offset-sm1 offset-md2 offset-lg3>
        <NewsCard
          v-for="newsUpdate in news"
          :key="newsUpdate.id"
          :newsUpdate="newsUpdate"
          :isAdmin="isAdmin"
          @edit="confirmEdit(newsUpdate)"
          @delete="confirmDelete(newsUpdate)"
          class="mt-3" />
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import Vuex from 'vuex'

export default {
  components: {
    Admin: () =>
      import(/* webpackChunkName: "news-admin" */
      './Admin'),
    NewsCard: () =>
      import(/* webpackChunkName: "news-card" */
      './Card')
  },
  data() {
    return {
      loading: true,
      selectedToEdit: null,
      selectedToDelete: null
    }
  },
  computed: Vuex.mapGetters(['news', 'isAdmin']),
  methods: {
    confirmEdit(newsUpdate) {
      this.selectedToEdit = newsUpdate
    },
    confirmDelete(newsUpdate) {
      this.selectedToDelete = newsUpdate
    }
  },
  created() {
    this.$store.dispatch('setNewsRef', {
      ref: this.$firebase.database().ref('news'),
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
