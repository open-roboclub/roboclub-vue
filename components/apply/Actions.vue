<template>
  <v-container>
    <v-dialog v-model="deleteDialog" width="500">
      <template #activator="{ on }">
        <v-icon medium color="red darken-2" v-on="on"> mdi-delete </v-icon>
      </template>
      <v-card>
        <v-card-title>
          This member will be deleted, are you sure?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-2" text @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="red darken-2"
            text
            @click="deleteEventHandler(member.id, member.facultyNumber)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" width="500">
      <template #activator="{ on }">
        <v-icon
          medium
          color="green darken-2"
          @click="setMemberToEdit(member)"
          v-on="on"
        >
          mdi-pencil
        </v-icon>
      </template>
      <v-card>
        <v-card-title> Edit this Member </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-text-field
                  v-model="memberToBeEdited.name"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-text-field
                  v-model="memberToBeEdited.email"
                  label="Email Address"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="3" md="3" sm="9" cols="12">
                <v-text-field
                  v-model="memberToBeEdited.mobile"
                  :counter="10"
                  label="Mobile Number (WhatsApp)"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="3" md="3" sm="3" cols="12">
                <v-container fluid>
                  <v-checkbox
                    v-model="memberToBeEdited.paymentStatus"
                    label="Paid"
                  ></v-checkbox>
                </v-container>
              </v-col>
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-select
                  v-model="memberToBeEdited.course"
                  :items="[
                    { text: 'Bachelor of Technology', value: 'btech' },
                    { text: 'Diploma Engineering', value: 'diploma' },
                    { text: 'Bachelor of Engineeing', value: 'be' },
                    { text: 'Masters of Technology', value: 'mtech' },
                    { text: 'Not a University Student', value: 'na' }
                  ]"
                  item-text="text"
                  item-value="value"
                  label="Course"
                ></v-select>
              </v-col>
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-text-field
                  v-model="memberToBeEdited.facultyNumber"
                  :counter="8"
                  label="Faculty Number"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-text-field
                  v-model="memberToBeEdited.enrollmentNumber"
                  :counter="6"
                  label="Enrollment Number"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editDialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="editEventHandler(member.id, member.facultyNumber)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    member: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    editDialog: false,
    deleteDialog: false
  }),
  computed: {
    ...mapState('apply', ['memberToBeEdited'])
  },
  methods: {
    async editEventHandler(id, facultyNumber) {
      await this.editMember([id, facultyNumber])
      this.editDialog = false
    },
    deleteEventHandler(id, facultyNumber) {
      this.deleteMember([id, facultyNumber])
      this.deleteDialog = false
    },
    ...mapActions('apply', ['editMember', 'deleteMember', 'setMemberToEdit'])
  }
}
</script>

<style></style>
