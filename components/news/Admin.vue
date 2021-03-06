<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="addDialog" max-width="500">
        <template #activator="{ on }">
          <v-btn fab dark class="cyan" v-on="on">
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Add News Update</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="newsItem.title"
              label="Title"
              prepend-icon="mdi-format-title"
              required
            />
            <v-textarea
              v-model="newsItem.notice"
              label="Notice"
              prepend-icon="mdi-pencil"
              required
            />
            <v-text-field
              v-model="newsItem.link"
              label="Link"
              prepend-icon="mdi-link"
            />
            <v-radio-group v-model="newsItem.notification">
              <v-radio label="Save" value="no" />
              <v-radio label="Send notification" value="only" />
              <v-radio label="Send notification and save" value="yes" />
            </v-radio-group>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn class="blue--text darken-1" text @click="addDialog = false">
              Close
            </v-btn>
            <v-btn class="blue--text darken-1" text @click="add"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="editDialog" max-width="500">
        <v-card>
          <v-card-title>
            <span class="headline">Edit News Update</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="editModel.title"
              label="Title"
              prepend-icon="mdi-format-title"
              required
            />
            <v-textarea
              v-model="editModel.notice"
              label="Notice"
              prepend-icon="mdi-pencil"
              required
            />
            <v-text-field
              v-model="editModel.link"
              label="Link"
              prepend-icon="mdi-link"
            />
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              class="blue--text darken-1"
              text
              @click="$emit('update:selectedToEdit', null)"
            >
              Close
            </v-btn>
            <v-btn class="blue--text darken-1" text @click="editNews">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="deleteDialog" max-width="500">
        <v-card>
          <v-card-title>
            <span class="headline">Delete News</span>
          </v-card-title>
          <v-card-text>
            Are you sure you want to delete the news item?
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              class="blue--text"
              text
              @click="$emit('update:selectedToDelete', null)"
            >
              No
            </v-btn>
            <v-btn class="red--text" text @click="deleteNewsItem"> Yes </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    selectedToEdit: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | null,
      required: true
    },
    selectedToDelete: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | null,
      required: true
    }
  },
  data() {
    return {
      addDialog: false
    }
  },
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
    ...mapState('news', ['newsItem'])
  },
  methods: {
    add() {
      if (this.newsItem.title.length < 5 || this.newsItem.notice.length < 5) {
        return
      }

      this.addDialog = false
      this.addNews()
    },
    editNews() {
      if (
        this.selectedToEdit.title.length < 5 ||
        this.selectedToEdit.notice.length < 5
      ) {
        return
      }

      this.saveNews(this.selectedToEdit)
      this.$emit('update:selectedToEdit', null)
    },
    deleteNewsItem() {
      this.deleteNews(this.selectedToDelete.id)
      this.$emit('update:selectedToDelete', null)
    },
    ...mapActions('news', ['addNews', 'saveNews', 'deleteNews'])
  }
}
</script>
