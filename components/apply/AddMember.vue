<template>
  <v-dialog v-model="addDialog" width="500">
    <template #activator="{ on }">
      <v-icon medium color="green darken-2" v-on="on"> mdi-plus </v-icon>
    </template>
    <v-card>
      <v-card-title> Add Member </v-card-title>
      <v-card-text>
        <v-container>
          <v-alert v-if="error.length" text type="error">
            {{ error }}
          </v-alert>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row v-if="member != undefined">
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-text-field
                  v-model="member.name"
                  label="Name"
                  :rules="rules.notNullRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-text-field
                  v-model="member.email"
                  label="Email Address"
                  :rules="rules.emailRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="3" md="3" sm="9" cols="12">
                <v-text-field
                  v-model="member.mobile"
                  :counter="10"
                  label="Mobile Number (WhatsApp)"
                  :rules="rules.mobileNumberRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="3" md="3" sm="3" cols="12">
                <v-container fluid>
                  <v-checkbox
                    v-model="member.paymentStatus"
                    label="Paid"
                  ></v-checkbox>
                </v-container>
              </v-col>
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-select
                  v-model="member.course"
                  :items="[
                    { text: 'Bachelor of Technology', value: 'btech' },
                    { text: 'Diploma Engineering', value: 'diploma' },
                    { text: 'Bachelor of Engineeing', value: 'be' }
                  ]"
                  item-text="text"
                  item-value="value"
                  :rules="rules.notNullRules"
                  label="Course"
                ></v-select>
              </v-col>
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-text-field
                  v-model="member.facultyNumber"
                  :rules="rules.facultyNumberRules"
                  :counter="8"
                  label="Faculty Number"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-text-field
                  v-model="member.enrollmentNumber"
                  :rules="rules.enrollmentNumberRules"
                  :counter="6"
                  label="Enrollment Number"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="addDialog = false">
          Cancel
        </v-btn>
        <v-btn color="green darken-1" text @click="addEventHandler">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { rules } from './rules'

export default {
  data: () => ({
    addDialog: false,
    valid: false,
    error: '',
    rules
  }),
  computed: {
    ...mapGetters('apply', ['member'])
  },
  methods: {
    async addEventHandler() {
      this.success = false
      this.error = ''
      await this.$refs.form.validate()
      if (this.valid) {
        this.error = await this.checkDuplicates(this.member.facultyNumber)
        if (this.error === undefined || this.error === null) this.error = ''
        if (this.error !== '') return
        await this.addMember(this.member.paymentStatus)
        this.$refs.form.reset()
        this.addDialog = false
      }
    },
    ...mapActions('apply', ['addMember', 'checkDuplicates'])
  }
}
</script>

<style></style>
