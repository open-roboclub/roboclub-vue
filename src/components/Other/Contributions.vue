<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 md10 lg8 xl6 offset-md1 offset-lg2 offset-xl3>
        <v-card class="green white--text">
          <v-card-title primary-title>
            <div>
              <div class="headline">Thanks for contributing!</div>
              <span class="grey--text text--lighten-3">You made us what we are today</span>
            </div>
          </v-card-title>
          <v-progress-linear :indeterminate="loading" v-show="loading" color="success"></v-progress-linear>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md10 lg8 xl6 offset-md1 offset-lg2 offset-xl3>
        <v-data-table :headers="headers" :items="contributions" v-model="selected" selected-key=".key" select-all class="elevation-1">
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

        <div class="text-xs-center" v-if="isAdmin">
          <v-btn @click="deleteContributions" v-show="selected.length > 0" fab dark large class="red mt-3">
            <v-icon dark>delete</v-icon>
          </v-btn>
          <v-btn @click="editContribution" v-show="selected.length == 1" fab dark large class="blue mt-3">
            <v-icon dark>edit</v-icon>
          </v-btn>
          <h5 class="grey--text text--darken-3 mt-4">Add a contribution</h5>
          <v-layout row wrap justify-space-between>
            <v-flex xs12 md4 xl2>
              <v-text-field v-model="contribution.contributor" label="Contributor" :rules="[rules.required]"></v-text-field>
            </v-flex>
            <v-flex xs12 md4 xl2>
              <v-text-field v-model="contribution.amount" label="Amount" :rules="[rules.required]"></v-text-field>
            </v-flex>
            <v-flex xs12 md4 xl2>
              <v-text-field v-model="contribution.purpose" label="Purpose"></v-text-field>
            </v-flex>
            <v-flex xs12 md4 xl2>
              <v-text-field v-model="contribution.remark" label="Remark"></v-text-field>
            </v-flex>
            <v-flex xs12 md4 xl2>
              <v-btn @click="saveContribution" fab dark class="cyan">
                <v-icon dark>{{ editing ? 'save' : 'add' }}</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </div>

      </v-flex>
    </v-layout>
    <v-snackbar :timeout="snackbar.timeout" :success="snackbar.context === 'success'" :info="snackbar.context === 'info'" :warning="snackbar.context === 'warning'"
      :error="snackbar.context === 'error'" :primary="snackbar.context === 'primary'" :secondary="snackbar.context === 'secondary'"
      :multi-line="snackbar.mode === 'multi-line'" :vertical="snackbar.mode === 'vertical'" v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn dark flat @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  import Vuex from 'vuex'

  export default {
    data () {
      return {
        loading: true,
        editing: false,
        selected: [],
        rules: {
          required: (value) => !!value || 'Required.'
        },
        headers: [
          {
            text: 'Contributor(s)',
            align: 'left',
            sortable: false,
            value: 'contributor'
          },
          {
            text: 'Contribution',
            align: 'left',
            sortable: false,
            value: 'amount'
          },
          {
            text: 'Purpose',
            align: 'left',
            sortable: false,
            value: 'purpose'
          },
          {
            text: 'Remarks',
            align: 'left',
            sortable: false,
            value: 'remark'
          }
        ],
        snackbar: {
          show: false,
          context: '',
          mode: '',
          timeout: 6000,
          text: 'Hello, I\'m a snackbar'
        }
      }
    },
    computed: Vuex.mapGetters(['contributions', 'contribution', 'isAdmin']),
    methods: {
      deleteContributions () {
        if (this.selected.length > 0) {
          this.selected.forEach(contribution => {
            this.$store.dispatch('deleteContribution', contribution['.key'])
          })
          this.selected = []
        } else {
          this.snackbar.context = 'error'
          this.snackbar.text = 'No contributions selected'
          this.snackbar.show = true
        }
      },
      saveContribution () {
        if (this.$store.getters.contribution.contributor === '' || this.$store.getters.contribution.amount === '') {
          return
        }

        if (this.editing) {
          this.$store.dispatch('saveContribution')
          this.editing = false
        } else {
          this.$store.dispatch('addContribution')
        }
      },
      editContribution () {
        this.editing = true
        this.$store.commit('setContribution', this.selected[0])
        this.selected = []
      }
    },
    created () {
      this.$store.dispatch('setContributionsRef', {
        ref: this.$firebase.database().ref('contribution'),
        callbacks: {
          readyCallback: snapshot => {
            this.loading = false
          },
          cancelCallback: error => {
            console.log(error)
            this.loading = false
          }
        }
      })
    }
  }

</script>
