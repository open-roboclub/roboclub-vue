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
          <v-alert v-if="error.length" text type="error">
            {{ error }}
          </v-alert>
        </v-col>
      </v-row>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <v-text-field
                v-model="memberToBeAdded.name"
                label="Name"
                :rules="rules.notNullRules"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" md="6" sm="12" cols="12">
              <v-text-field
                v-model="memberToBeAdded.email"
                label="Email Address"
                :rules="rules.emailRules"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" md="6" sm="12" cols="12">
              <v-text-field
                v-model="memberToBeAdded.mobile"
                :counter="10"
                label="Mobile Number (WhatsApp)"
                :rules="rules.mobileNumberRules"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" md="6" sm="12" cols="12">
              <v-select
                v-model="memberToBeAdded.course"
                :items="[
                  { text: 'Bachelor of Technology', value: 'btech' },
                  { text: 'Diploma Engineering', value: 'diploma' },
                  { text: 'Bachelor of Engineeing', value: 'be' },
                  { text: 'Masters of Technology', value: 'mtech' },
                  { text: 'Bachelor of Computer Applications', value: 'bca' },
                  { text: 'Masters of Computer Applications', value: 'mca' },
                  { text: 'Not a University Student', value: 'na' }
                ]"
                item-text="text"
                item-value="value"
                label="Course"
                :rules="rules.notNullRules"
              ></v-select>
            </v-col>
            <v-col lg="6" md="6" sm="12" cols="12">
              <v-text-field
                v-model="memberToBeAdded.facultyNumber"
                :counter="(memberToBeAdded.course === 'mtech' ? 9 : 8)"
                label="Faculty Number"
                :rules="(memberToBeAdded.course === 'mtech' ? rules.facultyNumberMtechRules : rules.facultyNumberRules)"
                required
              ></v-text-field>
            </v-col>
            <v-col lg="6" md="6" sm="12" cols="12">
              <v-text-field
                v-model="memberToBeAdded.enrollmentNumber"
                :counter="6"
                label="Enrollment Number"
                :rules="rules.enrollmentNumberRules"
                required
              ></v-text-field>
            </v-col>
            <v-btn depressed color="primary" @click="apply"> Submit </v-btn>
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
    error: ''
  }),
  head() {
    if (!this.isAdmin)
      return {
        title: 'Join Us'
      }
    else
      return {
        title: 'Members'
      }
  },

  computed: {
    ...mapState(['isAdmin']),
    ...mapState('apply', ['memberToBeAdded'])
  },

  methods: {
    async apply() {
      this.success = false
      await this.$refs.form.validate()
      if (this.valid) {
        this.error = await this.checkDuplicates(
          this.memberToBeAdded.facultyNumber,
          this.memberToBeAdded.course
        )
        if (this.error === undefined || this.error === null) this.error = ''
        if (this.error !== '') return
        await this.addMember(false)
        this.$refs.form.reset()
        this.success = true
      } else if (this.error === '') {
        this.error = 'Please fill up the form correctly before submitting.'
      }
    },
    ...mapActions('apply', ['addMember', 'checkDuplicates'])
  }
}
</script>

<style></style>
