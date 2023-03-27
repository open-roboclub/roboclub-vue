<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-card class="green white--text">
          <v-card-title class="headline">
            Thanks for contributing!
          </v-card-title>
          <v-card-text class="grey--text text--lighten-3">
            You made us what we are today
          </v-card-text>
          <v-progress-linear
            v-show="!contributions.length"
            indeterminate
            color="green lighten-3"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="contributions"
          item-key="name"
          show-select
          class="elevation-1"
        >
        </v-data-table>

        <ContributionAdmin v-if="isAdmin" :selected.sync="selected" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import headers from '~/components/contribution/headers'

export default {
  components: {
    ContributionAdmin: () =>
      import(
        /* webpackChunkName: "contributions-admin" */
        '~/components/contribution/Admin'
      )
  },
  data() {
    return {
      selected: [],
      headers
    }
  },
  head() {
    return {
      title: 'Contributions'
    }
  },
  computed: {
    ...mapState(['isAdmin']),
    ...mapGetters('contributions', ['contributions'])
  },
  created() {
    this.setContributionsRef()
  },
  methods: mapActions('contributions', ['setContributionsRef'])
}
</script>
