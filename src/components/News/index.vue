<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 sm10 md8 lg6 xl4 offset-sm1 offset-md2 offset-lg3 offset-xl4>
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
      <v-flex xs12 sm10 md8 lg6 xl4 offset-sm1 offset-md2 offset-lg3 offset-xl4>
        <v-card v-for="newsUpdate in news" :key="newsUpdate.id" class="mt-3">
          <v-card-title primary-title>
            <div>
              <div class="headline">{{ newsUpdate.title ? newsUpdate.title : 'News Update' }}</div>
            </div>
          </v-card-title>
          <div class="pr-3 pl-3 pb-3">
            <div class="grey--text text--darken-3">{{ newsUpdate.date }}</div>
            <br>
            <xmp>{{ newsUpdate.notice }}</xmp>
          </div>
          <v-card-actions>
            <v-btn flat class="orange--text" v-if="newsUpdate.link" :href="newsUpdate.link" target="_blank">Link</v-btn>
            <v-btn flat class="blue--text" v-if="isAdmin" @click.stop="confirmEdit(newsUpdate)">Edit</v-btn>
            <v-btn flat class="red--text" v-if="isAdmin" @click.stop="confirmDelete(newsUpdate)">Delete</v-btn>
          </v-card-actions>
        </v-card>
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
      './Admin')
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

<style scoped>
xmp {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
