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
            @click="deleteEventHandler(member['.key'])"
          >
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
          @click="setMemberToEdit(member)"
          v-on="on"
        >
          mdi-pencil
        </v-icon>
      </template>
      <v-card>
        <v-card-title>
          Edit this Member
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col lg="6" md="6" sm="12">
                <v-text-field
                  v-model="memberEdit.name"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="6" md="6" sm="12">
                <v-text-field
                  v-model="memberEdit.email"
                  label="Email Address"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="3" md="3" sm="9">
                <v-text-field
                  v-model="memberEdit.mobile"
                  :counter="10"
                  label="Mobile Number (WhatsApp)"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="3" md="3" sm="3">
                <v-container fluid>
                  <v-checkbox
                    v-model="memberEdit.paymentStatus"
                    label="Paid"
                  ></v-checkbox>
                </v-container>
              </v-col>
              <v-col lg="6" md="6" sm="12">
                <v-select
                  v-model="memberEdit.course"
                  :items="[
                    { text: 'Bachelor in Technology', value: 'btech' },
                    { text: 'Diploma Engineering', value: 'diploma' }
                  ]"
                  item-text="text"
                  item-value="value"
                  label="Course"
                ></v-select>
              </v-col>
              <v-col lg="6" md="6" sm="12">
                <v-text-field
                  v-model="memberEdit.facultyNumber"
                  :counter="8"
                  label="Faculty Number"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="6" md="6" sm="12">
                <v-text-field
                  v-model="memberEdit.enrollmentNumber"
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
            @click="editEventHandler(member['.key'])"
          >
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
    ...mapGetters('apply', ['memberEdit'])
  },
  methods: {
    editEventHandler(id) {
      this.editMember(id)
      this.editDialog = false
    },
    deleteEventHandler(id) {
      this.deleteMember(id)
      this.deleteDialog = false
    },
    ...mapActions('apply', ['editMember', 'deleteMember', 'setMemberToEdit'])
  }
}
</script>

<style></style>
