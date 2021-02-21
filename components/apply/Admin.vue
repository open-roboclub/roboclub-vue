<template>
  <v-container>
    <v-row>
      <v-col cols="10" sm="6" offset-sm="3" offset="1">
        <v-card class="mt-0 mb-4" color="#C1FFC1">
          <v-card-text>
            <div>
              <h1 class="text-center headline black--text">Member's List</h1>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <AddMember />
    </v-row>

    <v-simple-table>
      <template #default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Mobile</th>
            <th class="text-left">Email</th>
            <th class="text-left">Date Applied</th>
            <th class="text-left">Faculty Number</th>
            <th class="text-left">Paid</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.enrollmentNumber">
            <td>{{ member.name }}</td>
            <td>{{ member.mobile }}</td>
            <td>{{ member.email }}</td>
            <td>{{ new Date(member.timestamp).toDateString() }}</td>
            <td>{{ member.facultyNumber }}</td>
            <td v-if="member.paymentStatus === false">
              <v-icon medium color="red darken-2" v-on="on">
                mdi-window-close
              </v-icon>
            </td>
            <td v-if="member.paymentStatus === true">
              <v-icon medium color="green darken-2" v-on="on">
                mdi-check
              </v-icon>
            </td>
            <td><Actions :member="member" /></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Actions from './Actions'
import AddMember from './AddMember'

export default {
  components: {
    Actions,
    AddMember
  },
  computed: {
    ...mapGetters('apply', ['members'])
  },
  created() {
    this.setMembersRef()
  },
  methods: {
    ...mapActions('apply', ['setMembersRef'])
  }
}
</script>

<style></style>
