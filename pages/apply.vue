<template>
  <v-container>
    <Admin v-if="isAdmin" />
    <v-container v-if="!isAdmin">
      <v-row>
        <v-col cols="10" sm="6" offset-sm="3" offset="1">
          <v-card class="mt-0 mb-4" color="#C1FFC1">
            <v-card-text>
              <div>
                <h1 class="text-center headline black--text">Join Us</h1>
              </div>
            </v-card-text>
          </v-card>
          <v-alert v-if="success" text type="success">
            Your application has been submitted
          </v-alert>
          <v-alert v-if="error" text type="error">
            Please fill up the form correctly before submitting
          </v-alert>
        </v-col>
      </v-row>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col lg="6" md="6" sm="12">
              <v-text-field
                v-model="memberToBeAdded.name"
                label="Name"
                :rules="rules.notNullRules"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" md="6" sm="12">
              <v-text-field
                v-model="memberToBeAdded.email"
                label="Email Address"
                :rules="rules.emailRules"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" md="6" sm="12">
              <v-text-field
                v-model="memberToBeAdded.mobile"
                :counter="10"
                label="Mobile Number (WhatsApp)"
                :rules="rules.mobileNumberRules"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" md="6" sm="12">
              <v-select
                v-model="memberToBeAdded.course"
                :items="[
                  { text: 'Bachelor in Technology', value: 'btech' },
                  { text: 'Diploma Engineering', value: 'diploma' }
                ]"
                item-text="text"
                item-value="value"
                label="Course"
                :rules="rules.notNullRules"
              ></v-select>
            </v-col>
            <v-col lg="6" md="6" sm="12">
              <v-text-field
                v-model="memberToBeAdded.facultyNumber"
                :counter="8"
                label="Faculty Number"
                :rules="rules.facultyNumberRules"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" md="6" sm="12">
              <v-text-field
                v-model="memberToBeAdded.enrollmentNumber"
                :counter="6"
                label="Enrollment Number"
                :rules="rules.enrollmentNumberRules"
                required
              ></v-text-field>
            </v-col>
            <v-btn depressed color="primary" @click="apply">
              Submit
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { rules } from '~/components/apply/rules'
import Admin from '~/components/apply/Admin'

export default {
  components: {
    Admin
  },

  data: () => ({
    valid: false,
    rules,
    success: false,
    error: false
  }),

  computed: {
    ...mapState(['isAdmin']),
    ...mapState('apply', ['memberToBeAdded'])
  },

  methods: {
    async apply() {
      this.success = false
      this.error = ''
      await this.$refs.form.validate()
      if (this.valid) {
        await this.addMember(false)
        this.$refs.form.reset()
        this.success = true
      } else {
        this.error = true
      }
    },
    ...mapActions('apply', ['addMember'])
  },

  head() {
    if (!this.isAdmin)
      return {
        title: 'Join Us'
      }
    else
      return {
        title: 'Members'
      }
  }
}
</script>

<style></style>