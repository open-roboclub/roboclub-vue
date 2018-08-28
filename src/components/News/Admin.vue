<template>
  <div>
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
            <v-textarea label="Notice" v-model="newsItem.notice" prepend-icon="edit" required></v-textarea>
            <v-text-field label="Link" v-model="newsItem.link" prepend-icon="link"></v-text-field>
            <v-radio-group v-model="newsItem.notification">
              <v-radio label="Save" value="no"></v-radio>
              <v-radio label="Send notification" value="only"></v-radio>
              <v-radio label="Send notification and save" value="yes"></v-radio>
            </v-radio-group>
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
            <v-text-field label="Title" v-model="editModel.title" prepend-icon="title" required></v-text-field>
            <v-textarea label="Notice" v-model="editModel.notice" prepend-icon="edit" required></v-textarea>
            <v-text-field label="Link" v-model="editModel.link" prepend-icon="link"></v-text-field>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click="$emit('update:selectedToEdit', null)">Close</v-btn>
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
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data() {
    return {
      addDialog: false
    }
  },
  props: ['selectedToEdit', 'selectedToDelete'],
  computed: {
    deleteDialog() {
      return this.selectedToDelete !== null
    },
    editDialog() {
      return this.selectedToEdit !== null
    },
    editModel() {
      return this.selectedToEdit === null ? {} : this.selectedToEdit
    },
    ...Vuex.mapGetters(['newsItem'])
  },
  methods: {
    add() {
      if (this.newsItem.title.length < 5 || this.newsItem.notice.length < 5) {
        return
      }

      this.addDialog = false
      this.$store.dispatch('addNews')
    },
    editNews() {
      if (
        this.selectedToEdit.title.length < 5 ||
        this.selectedToEdit.notice.length < 5
      ) {
        return
      }

      this.$store.dispatch('saveNews', this.selectedToEdit)
      this.$emit('update:selectedToEdit', null)
    },
    deleteNews() {
      this.$store.dispatch('deleteNews', this.selectedToDelete['.key'])
      this.$emit('update:selectedToDelete', null)
    }
  }
}
</script>
