<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn dark fab class="cyan" v-on="on">
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add New Project</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="title"
                :counter="100"
                :rules="titleRules"
                label="Title*"
                required
              ></v-text-field>

              <v-text-field
                v-model="team"
                :rules="teamRules"
                label="Team*"
                placeholder="For example: Areeb Jamal, Haider Ali"
                required
              ></v-text-field>

              <v-textarea
                v-model="description"
                :rules="descriptionRules"
                label="Description*"
                placeholder="Enter description so that others can know about this project."
              ></v-textarea>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-select
                v-model="select"
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                label="Item"
                required
              ></v-select>

              <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox>

              <v-btn :disabled="!valid" color="success" @click="validate">
                Validate
              </v-btn>

              <v-btn color="error" @click="reset">
                Reset Form
              </v-btn>

              <v-btn color="warning" @click="resetValidation">
                Reset Validation
              </v-btn>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    valid: true,
    title: '',
    titleRules: [
      v => !!v || 'Title is required',
      v => (v && v.length <= 100) || 'Title must be less than 100 characters'
    ],
    team: '',
    teamRules: [v => !!v || 'Team is required'],
    description: '',
    descriptionRules: [v => !!v || 'Description is required'],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    checkbox: false
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getID(title) {
      let id = title.replace(/[^a-z\d\s]+/gi, '')
      id = id.replace(/\s+/g, '-').toLowerCase()
      return id
    }
  }
}
</script>
