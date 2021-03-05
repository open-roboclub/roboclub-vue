<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="500">
      <template #activator="{ on }">
        <v-btn fab dark class="cyan" v-on="on">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title> Add a New Entry </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="entryAdd.name"
                  label="Name"
                  prepend-icon="mdi-book"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="type"
                  :items="inventoryTypes"
                  label="Type"
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="entryAdd.working"
                  label="Working"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="entryAdd.total" label="Total" required>
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="entryAdd.allotted"
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
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="add"> Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    inventoryTypes: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    dialog: false,
    entryId: '',
    type: ''
  }),
  computed: {
    ...mapGetters('inventory', ['entryAdd'])
  },
  methods: {
    add() {
      if (
        parseInt(this.entryAdd.total) < parseInt(this.entryAdd.working) ||
        parseInt(this.entryAdd.total) < parseInt(this.entryAdd.allotted)
      )
        return
      this.addEntry(this.type)
      this.dialog = false
      this.type = ''
    },
    ...mapActions('inventory', ['addEntry'])
  }
}
</script>

<style></style>
