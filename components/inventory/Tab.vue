<template>
  <v-data-table
    :headers="headers"
    :items="Object.values(inventory)"
    item-key="name"
    :items-per-page="5"
  >
    <template v-slot:item.remaining="{ item }">
      {{ item.total - item.allotted }}
    </template>
    <template v-if="isAdmin" v-slot:item.actions="{ item }">
      <Admin :item="item" :type-id="typeId" />
    </template>
    <template v-else-if="user" v-slot:item.actions="{ item }">
      <User :item="item" :type-id="typeId" />
    </template>
    <template v-else v-slot:item.actions>
      ---
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'
import headers from './header'
import Admin from './Admin'
import User from './User'

export default {
  components: {
    Admin,
    User
  },
  props: {
    typeId: {
      type: String,
      required: true
    },
    inventory: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    headers
  }),
  computed: {
    ...mapState(['isAdmin']),
    ...mapState(['user'])
  }
}
</script>
