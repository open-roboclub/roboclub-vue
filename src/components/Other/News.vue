<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 sm10 md8 lg4 offset-sm1 offset-md2 offset-lg4>
        <v-card class="blue-grey white--text">
          <div class="text-xs-center headline pt-4 pb-4">News Panel</div>
          <v-progress-linear :indeterminate="loading" v-show="loading" class="blue-grey"></v-progress-linear>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="mt-2"></div>
    <v-layout row justify-center>
      <v-dialog v-model="addDialog">
        <v-btn slot="activator" fab dark class="cyan">
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Add News Update</span>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Title" v-model="newsItem.title" prepend-icon="title" required></v-text-field>
            <v-text-field label="Notice" v-model="newsItem.notice" prepend-icon="edit" required multi-line></v-text-field>
            <v-text-field label="Link" v-model="newsItem.link" prepend-icon="link"></v-text-field>
            <v-radio label="Save" v-model="newsItem.notification" value="no"></v-radio>
            <v-radio label="Send notification" v-model="newsItem.notification" value="only"></v-radio>
            <v-radio label="Send notification and save" v-model="newsItem.notification" value="yes"></v-radio>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click="addDialog = false">Close</v-btn>
            <v-btn class="blue--text darken-1" flat @click="add">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="editDialog">
        <v-card>
          <v-card-title>
            <span class="headline">Edit News Update</span>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Title" v-model="selectedToEdit.title" prepend-icon="title" required></v-text-field>
            <v-text-field label="Notice" v-model="selectedToEdit.notice" prepend-icon="edit" required multi-line></v-text-field>
            <v-text-field label="Link" v-model="selectedToEdit.link" prepend-icon="link"></v-text-field>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click="editDialog = false">Close</v-btn>
            <v-btn class="blue--text darken-1" flat @click="editNews">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="deleteDialog">
        <v-card>
          <v-card-title>
            <span class="headline">Delete News</span>
          </v-card-title>
          <v-card-text>
            Are you sure you want to delete the news item?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text" flat @click="deleteDialog = false">No</v-btn>
            <v-btn class="red--text" flat @click="deleteNews">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row>
      <v-flex xs12 sm10 md8 lg4 offset-sm1 offset-md2 offset-lg4>
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
    data () {
      return {
        loading: true,
        addDialog: false,
        editDialog: false,
        deleteDialog: false,
        selectedToEdit: {},
        selectedToDelete: null
      }
    },
    computed: Vuex.mapGetters(['news', 'newsItem', 'isAdmin']),
    methods: {
      add () {
        if (this.newsItem.title.length < 5 || this.newsItem.notice.length < 5) {
          return
        }

        this.addDialog = false
        this.$store.dispatch('addNews')
      },
      confirmEdit (newsUpdate) {
        this.editDialog = true
        this.selectedToEdit = newsUpdate
      },
      editNews () {
        if (this.selectedToEdit.title.length < 5 || this.selectedToEdit.notice.length < 5) {
          return
        }

        this.editDialog = false
        this.$store.dispatch('saveNews', this.selectedToEdit)
        this.selectedToEdit = {}
      },
      confirmDelete (newsUpdate) {
        this.deleteDialog = true
        this.selectedToDelete = newsUpdate
      },
      deleteNews () {
        this.deleteDialog = false
        this.$store.dispatch('deleteNews', this.selectedToDelete['.key'])
        this.selectedToDelete = null
      }
    },
    created () {
      this.$store.dispatch('setNewsRef', {
        ref: this.$firebase.database().ref('news'),
        callbacks: {
          readyCallback: snapshot => {
            this.loading = false
          },
          cancelCallback: error => {
            console.log(error)
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
