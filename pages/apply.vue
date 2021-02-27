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
                    src="https://firebasestorage.googleapis.com/v0/b/amu-roboclub.appspot.com/o/QR.png?alt=media&token=621bf3f7-624c-48be-bcf1-23bfb9c89125"
                    cols="12"
                    max-width="300"
                  />
                </v-row>
                <v-row justify="center">
                  <v-card color="#ffffba" max-width="75%">
                    <v-container>
                      <v-list-item>
                        <div>
                          <div class="font-weight-medium">
                            Problem scanning QR?
                          </div>
                          Pay to
                          <span class="font-weight-medium">
                            UPI ID:
                            <span class="font-italic"
                              >prafullvarshney2000@oksbi</span
                            >
                          </span>
                        </div>
                      </v-list-item>

                      <ul>
                        <li>
                          <div>Registration Fees:- ₹200</div>
                        </li>
                        <li>
                          <div>Registration Validity:- 2 years</div>
                        </li>
                        <li>
                          <div>
                            During your payment, clearly mention your name and
                            faculty number in note attached with it.
                          </div>
                        </li>
                        <li>
                          <div>
                            If you face any difficulty with regards to payment,
                            contact (+91) 99974 23637.
                          </div>
                        </li>
                        <li>
                          <div>
                            Once your transaction is succesfull, we will reach
                            you shortly.
                          </div>
                        </li>
                      </ul>
                    </v-container>
                  </v-card>
                </v-row>
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
    dialog: false,
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
