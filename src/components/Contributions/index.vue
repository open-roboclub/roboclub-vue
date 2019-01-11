<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 md10 lg8 xl6 offset-md1 offset-lg2 offset-xl3>
        <v-card class="green white--text">
          <v-card-title primary-title>
            <div>
              <div class="headline">Thanks for contributing!</div>
              <span class="grey--text text--lighten-3"
                >You made us what we are today</span>
            </div>
          </v-card-title>
          <v-progress-linear
            :indeterminate="loading"
            v-show="loading"
            color="green lighten-3"
          ></v-progress-linear>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md10 lg8 xl6 offset-md1 offset-lg2 offset-xl3>
        <v-data-table
          :headers="headers"
          :items="contributions"
          v-model="selected"
          item-key="contributor"
          select-all
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>
              <v-checkbox primary hide-details v-model="props.selected">
              </v-checkbox>
            </td>
            <td>{{ props.item.contributor }}</td>
            <td>{{ props.item.amount }}</td>
            <td>{{ props.item.purpose }}</td>
            <td>{{ props.item.remark }}</td>
          </template>
        </v-data-table>

        <ContributionAdmin v-if="isAdmin" :selected.sync="selected" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import headers from './headers'

export default {
  metaInfo: {
    title: 'Contributions'
  },
  components: {
    ContributionAdmin: () =>
      import(/* webpackChunkName: "contributions-admin" */
      './Admin')
  },
  data() {
    return {
      loading: true,
      selected: [],
      headers
    }
  },
  computed: {
    ...mapState(['isAdmin']),
    ...mapGetters('contributions', ['contributions'])
  },
  methods: mapActions('contributions', ['setContributionsRef']),
  created() {
    this.setContributionsRef({
      ref: this.$firebase.database().ref('contribution'),
      callbacks: {
        readyCallback: () => {
          this.loading = false
        },
        cancelCallback: error => {
          console.error(error)
          this.loading = false
        }
      }
    })
  }
}
</script>
