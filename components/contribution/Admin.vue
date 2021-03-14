<template>
  <div class="text-center">
    <div v-show="selected.length > 0" class="mt-3">
      <v-btn fab dark class="red" @click="deleteContributions">
        <v-icon dark> mdi-delete </v-icon>
      </v-btn>
      <v-btn fab dark class="blue ml-3" @click="editContribution">
        <v-icon dark> mdi-pencil </v-icon>
      </v-btn>
    </div>

    <h5 class="grey--text text--darken-3 mt-4">Add a contribution</h5>
    <v-row justify="space-between">
      <v-col cols="12" md="4" xl="2">
        <v-text-field
          v-model="contribution.name"
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
        <v-text-field v-model="contribution.description" label="Purpose" />
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
    <v-snackbar v-model="snackbar.show" :color="snackbar.context">
      {{ snackbar.text }}
      <v-btn dark text @click="snackbar.show = false"> Close </v-btn>
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
        text: "Hello, I'm a snackbar"
      }
    }
  },
  computed: mapState('contributions', ['contribution']),
  methods: {
    showSnackbar(context, message) {
      this.snackbar.context = context
      this.snackbar.text = message
      this.snackbar.show = true
    },

    showSuccess(message) {
      this.showSnackbar('success', message)
    },

    showError(message) {
      this.showSnackbar('error', message)
    },

    deleteContributions() {
      if (this.selected.length > 0) {
        this.selected.forEach(contribution => {
          this.deleteContribution(contribution.id)
        })
        this.$emit('update:selected', [])
      } else {
        this.showError('No contribution selected')
      }
    },

    save() {
      if (this.contribution.name === '' || this.contribution.amount === '') {
        return
      }

      if (this.editing) {
        this.saveContribution()
        this.editing = false
      } else {
        this.addContribution()
      }

      this.showSuccess('Contribution Saved')
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
