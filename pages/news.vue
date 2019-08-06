<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 sm10 md8 lg6 offset-sm1 offset-md2 offset-lg3>
        <v-card class="blue-grey white--text">
          <div class="text-xs-center headline pt-4 pb-4">
            News Panel
          </div>
          <v-progress-linear
            v-show="!news.length"
            indeterminate
            color="blue-grey"
            background-color="blue-grey lighten-3"
          />
        </v-card>
      </v-flex>
    </v-layout>
    <div class="mt-2" />

    <Admin
      v-if="isAdmin"
      :selected-to-edit.sync="selectedToEdit"
      :selected-to-delete.sync="selectedToDelete"
    />

    <v-layout row>
      <v-flex xs12 sm10 md8 lg6 offset-sm1 offset-md2 offset-lg3>
        <NewsCard
          v-for="newsUpdate in news"
          :key="newsUpdate.id"
          :news-update="newsUpdate"
          :is-admin="isAdmin"
          class="mt-3"
          @edit="confirmEdit(newsUpdate)"
          @delete="confirmDelete(newsUpdate)"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Card from '~/components/news/Card'

export default {
  head() {
    return {
      title: 'News'
    }
  },
  components: {
    Admin: () =>
      import(
        /* webpackChunkName: "news-admin" */
        '~/components/news/Admin'
      ),
    NewsCard: Card
  },
  data() {
    return {
      selectedToEdit: null,
      selectedToDelete: null
    }
  },
  computed: {
    ...mapState(['isAdmin']),
    ...mapGetters('news', ['news'])
  },
  created() {
    this.setNewsRef({
      ref: this.$firebase.database().ref('news')
    })
  },
  methods: {
    confirmEdit(newsUpdate) {
      this.selectedToEdit = newsUpdate
    },
    confirmDelete(newsUpdate) {
      this.selectedToDelete = newsUpdate
    },
    ...mapActions('news', ['setNewsRef'])
  }
}
</script>
