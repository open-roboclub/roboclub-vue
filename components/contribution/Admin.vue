<template>
  <div class="text-center">
    <v-btn
      v-show="selected.length > 0"
      fab
      dark
      large
      class="red mt-3"
      @click="deleteContributions"
    >
      <v-icon dark>
        mdi-delete
      </v-icon>
    </v-btn>
    <v-btn
      v-show="selected.length == 1"
      fab
      dark
      large
      class="blue mt-3"
      @click="editContribution"
    >
      <v-icon dark>
        mdi-pencil
      </v-icon>
    </v-btn>
    <h5 class="grey--text text--darken-3 mt-4">
      Add a contribution
    </h5>
    <v-row justify="space-between">
      <v-col cols="12" md="4" xl="2">
        <v-text-field
          v-model="contribution.contributor"
          :rules="[rules.required]"
          label="Contributor"
        />
      </v-col>
      <v-col cols="12" md="4" xl="2">
        <v-text-field
          v-model="contribution.amount"
          :rules="[rules.required]"
          label="Amount"
        />
      </v-col>
      <v-col cols="12" md="4" xl="2">
        <v-text-field v-model="contribution.purpose" label="Purpose" />
      </v-col>
      <v-col cols="12" md="4" xl="2">
        <v-text-field v-model="contribution.remark" label="Remark" />
      </v-col>
      <v-col cols="12" md="4" xl="2">
        <v-btn fab dark class="cyan" @click="save">
          <v-icon dark>
            {{ editing ? 'mdi-content-save' : 'mdi-plus' }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      :success="snackbar.context === 'success'"
      :info="snackbar.context === 'info'"
      :warning="snackbar.context === 'warning'"
      :error="snackbar.context === 'error'"
      :primary="snackbar.context === 'primary'"
      :secondary="snackbar.context === 'secondary'"
      :multi-line="snackbar.mode === 'multi-line'"
      :vertical="snackbar.mode === 'vertical'"
    >
      {{ snackbar.text }}
      <v-btn dark text @click="snackbar.show = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  props: {
    selected: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      editing: false,
      rules: {
        required: value => !!value || 'Required.'
      },
      snackbar: {
        show: false,
        context: '',
        mode: '',
        timeout: 6000,
        text: "Hello, I'm a snackbar"
      }
    }
  },
  computed: mapState('contributions', ['contribution']),
  methods: {
    deleteContributions() {
      if (this.selected.length > 0) {
        this.selected.forEach(contribution => {
          this.deleteContribution(contribution['.key'])
        })
        this.$emit('update:selected', [])
      } else {
        this.snackbar.context = 'error'
        this.snackbar.text = 'No contributions selected'
        this.snackbar.show = true
      }
    },
    save() {
      if (
        this.contribution.contributor === '' ||
        this.contribution.amount === ''
      ) {
        return
      }

      if (this.editing) {
        this.saveContribution()
        this.editing = false
      } else {
        this.addContribution()
      }
    },
    editContribution() {
      this.editing = true
      this.setContribution(this.selected[0])
      this.$emit('update:selected', [])
    },
    ...mapActions('contributions', [
      'addContribution',
      'saveContribution',
      'deleteContribution'
    ]),
    ...mapMutations('contributions', ['setContribution'])
  }
}
</script>
