<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="blue-grey white--text">
          <div class="text-center headline pt-4 pb-4">News Panel</div>
          <v-progress-linear
            v-show="!news.length"
            indeterminate
            color="blue-grey"
            background-color="blue-grey lighten-3"
          />
        </v-card>
      </v-col>
    </v-row>

    <Admin
      v-if="isAdmin"
      class="mt-2"
      :selected-to-edit.sync="selectedToEdit"
      :selected-to-delete.sync="selectedToDelete"
    />

    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <NewsCard
          v-for="newsUpdate in news"
          :key="newsUpdate.id"
          :news-update="newsUpdate"
          :is-admin="isAdmin"
          class="mt-3"
          @edit="confirmEdit(newsUpdate)"
          @delete="confirmDelete(newsUpdate)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Card from '~/components/news/Card'

export default {
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
  head() {
    return {
      title: 'News'
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
