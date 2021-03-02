<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="500">
      <template #activator="{ on }">
        <v-icon medium color="blue darken-2" v-on="on"> mdi-anchor </v-icon>
      </template>
      <v-card>
        <v-card-title> Book this item </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field v-model="quantity" label="Quantity" required>
            </v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="request">
            Send Request
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
    typeId: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    quantity: 0,
    dialog: false
  }),
  computed: {
    ...mapState(['user'])
  },
  methods: {
    request() {
      if (
        this.quantity > this.$props.item.total - this.$props.item.allotted ||
        this.quantity === 0
      )
        return
      this.sendRequest([
        this.$props.item.name,
        this.quantity,
        this.user.displayName,
        this.$props.typeId,
        this.user.email
      ])
      this.dialog = false
    },
    ...mapActions('inventory', ['sendRequest'])
  }
}
</script>

<style></style>
