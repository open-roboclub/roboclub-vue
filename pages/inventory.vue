<template>
  <v-container>
    <v-row>
      <v-col cols="10" sm="6" offset-sm="3" offset="1">
        <v-card class="mt-0 mb-4" color="#C1FFC1">
          <v-card-text>
            <div>
              <h1 class="text-center headline black--text">Inventory</h1>
            </div>
          </v-card-text>
          <v-progress-linear
            v-show="inventory.length == '0'"
            :indeterminate="!inventory.length"
            color="blue"
            background-color="white"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-row v-show="inventory.length" v-if="isAdmin" justify="center">
      <v-col cols="1">
        <AddEntry :inventory-types="inventoryTypes" />
      </v-col>
      <v-col cols="1">
        <ViewRequest />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col lg="8" md="10" sm="12">
        <v-card v-show="inventory.length" color="green">
          <v-card-title class="text-center headline white--text">
            Inventory Table
          </v-card-title>
          <v-tabs
            v-model="active"
            background-color="cyan"
            dark
            centered
            slider-color="yellow"
            show-arrows
          >
            <v-tab
              v-for="tab in inventoryTypes"
              :key="tab"
              :href="'#' + tab"
              ripple
              class="white--text"
            >
              {{ tab }}
            </v-tab>
            <v-tab-item
              v-for="item in inventory"
              :key="item.name"
              :value="item.name"
            >
              <InventoryTab :type-id="item['.key']" :inventory="item.items" />
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import InventoryTab from '~/components/inventory/Tab'
import AddEntry from '~/components/inventory/Add'
import ViewRequest from '~/components/inventory/Requests'

export default {
  components: {
    InventoryTab,
    AddEntry,
    ViewRequest
  },
  head() {
    return {
      title: 'Inventory'
    }
  },
  computed: {
    ...mapState(['isAdmin']),
    ...mapGetters('inventory', ['inventoryTypes']),
    ...mapGetters('inventory', ['inventory'])
  },
  created() {
    this.setInventoryRef()
    this.setRequestsRef()
  },
  methods: {
    ...mapActions('inventory', ['setInventoryRef', 'setRequestsRef'])
  }
}
</script>
