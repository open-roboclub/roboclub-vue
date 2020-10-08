<template>
  <v-container>
    <v-dialog v-model="deleteDialog" width="500">
      <template v-slot:activator="{ on }">
        <v-icon medium color="red darken-2" v-on="on">
          mdi-delete
        </v-icon>
      </template>
      <v-card>
        <v-card-title>
          This entry will be deleted, are you sure?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-2" text @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn color="red darken-2" text @click="confirmDelete">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" width="500">
      <template v-slot:activator="{ on }">
        <v-icon
          medium
          color="green darken-2"
          @click="setEntryValue(item)"
          v-on="on"
        >
          mdi-pencil
        </v-icon>
      </template>
      <v-card>
        <v-card-title>
          Edit this entry
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="entry.name" label="Name" required>
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="entry.working" label="Working" required>
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="entry.total" label="Total" required>
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="entry.allotted"
                  label="Allotted"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editDialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    typeId: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    editDialog: false,
    deleteDialog: false
  }),
  computed: {
    ...mapGetters('inventory', ['entry'])
  },
  methods: {
    save() {
      if (
        this.entry.total < this.entry.working ||
        this.entry.total < this.entry.allotted
      )
        return
      this.saveEntry([this.$props.item, this.$props.typeId, this.entry])
      this.editDialog = false
    },
    confirmDelete() {
      this.deleteEntry([this.$props.item, this.$props.typeId])
    },
    ...mapActions('inventory', ['saveEntry', 'deleteEntry', 'setEntryValue'])
  }
}
</script>

<style></style>
