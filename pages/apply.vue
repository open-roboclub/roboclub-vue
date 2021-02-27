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
                  { text: 'Bachelor in Technology', value: 'btech' },
                  { text: 'Diploma Engineering', value: 'diploma' }
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
                :counter="8"
                label="Faculty Number"
                :rules="rules.facultyNumberRules"
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
            <v-dialog v-model="dialog" max-width="650">
              <v-card>
                <v-card-title> Pay </v-card-title>
                <v-row justify="center">
                  <v-img
                    src="https://firebasestorage.googleapis.com/v0/b/amu-roboclub.appspot.com/o/QR.png?alt=media&token=28f4c9b2-d6b0-4a3e-8467-991216e9607a"
                    cols="12"
                    max-width="300"
                  />
                </v-row>
                <v-card-text>
                  <v-container>
                    <v-container>
                      <v-list-item>
                        <v-list-item-content>
                          <div>UPI ID = prafullvarshney2000@oksbi</div>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <h2>Things to keep in mind while Paying:-</h2>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <div>
                          <v-icon> mdi-arrow-right </v-icon>
                          During your payment, clearly mention your name and
                          faculty number in note attached with it.
                        </div>
                      </v-list-item>
                      <v-list-item>
                        <div>
                          <v-icon> mdi-arrow-right </v-icon>
                          If you face any difficulty with regards to payment,
                          contact (+91) 99974 23637.
                        </div>
                      </v-list-item>
                      <v-list-item>
                        <div>
                          <v-icon> mdi-arrow-right </v-icon>
                          Once your transaction is succesfull, we will reach you
                          shortly.
                        </div>
                      </v-list-item>
                    </v-container>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Done
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
    dialog: true,
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
          this.memberToBeAdded.facultyNumber
        )
        if (this.error === undefined || this.error === null) this.error = ''
        if (this.error !== '') return
        await this.addMember(false)
        this.$refs.form.reset()
        this.success = true
        this.dialog = true
      } else if (this.error === '') {
        this.error = 'Please fill up the form correctly before submitting.'
      }
    },
    ...mapActions('apply', ['addMember', 'checkDuplicates'])
  }
}
</script>

<style></style>
