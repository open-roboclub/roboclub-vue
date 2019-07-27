<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs10 sm6 offset-sm3 offset-xs1>
        <v-card class="mt-0 mb-4" color="#C1FFC1">
          <v-card-text>
            <div>
              <h1 class="inventory-header">
                Inventory
              </h1>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-card
        v-for="inven in inventory.microcontroller"
        :key="inven['.key']"
        class="mx-auto mb-3"
        width="400"
      >
        <v-flex xs12 class="text-xs-center">
          <v-avatar :tile="false" :size="200" color="grey lighten-4 mt-3">
            <v-img :aspect-ratio="16 / 9" :src="inven.thumbnail" alt="Avatar" />
          </v-avatar>
        </v-flex>
        <v-card-title>
          <v-flex xs12 class="text-xs-center">
            <div>
              <span class="headline">{{ inven.name }}</span>
            </div>
            <div class="d-flex">
              <div class="ml-2 grey--text text--darken-2">
                <span>Total: {{ inven.total }}</span>
              </div>
              <div class="ml-2 grey--text text--darken-2">
                <span>Working: {{ inven.working }}</span>
              </div>
              <div class="ml-2 grey--text text--darken-2">
                <span>Allotted: {{ inven.allotted }}</span>
              </div>
            </div>
          </v-flex>
        </v-card-title>
      </v-card>
      <v-card
        v-for="inven in inventory.sensors"
        :key="inven['.key']"
        class="mx-auto mb-3"
        width="400"
      >
        <v-flex xs12 class="text-xs-center">
          <v-avatar :tile="false" :size="200" color="grey lighten-4 mt-3">
            <v-img :aspect-ratio="16 / 9" :src="inven.thumbnail" alt="Avatar" />
          </v-avatar>
        </v-flex>
        <v-card-title>
          <v-flex xs12 class="text-xs-center">
            <div>
              <span class="headline">{{ inven.name }}</span>
            </div>
            <div class="d-flex">
              <div class="ml-2 grey--text text--darken-2">
                <span>Total: {{ inven.total }}</span>
              </div>
              <div class="ml-2 grey--text text--darken-2">
                <span>Working: {{ inven.working }}</span>
              </div>
              <div class="ml-2 grey--text text--darken-2">
                <span>Allotted: {{ inven.allotted }}</span>
              </div>
            </div>
          </v-flex>
        </v-card-title>
      </v-card>
      <v-card
        v-for="inven in inventory.wires"
        :key="inven['.key']"
        class="mx-auto mb-3"
        width="400"
      >
        <v-flex xs12 class="text-xs-center">
          <v-avatar :tile="false" :size="200" color="grey lighten-4 mt-3">
            <v-img :aspect-ratio="16 / 9" :src="inven.thumbnail" alt="Avatar" />
          </v-avatar>
        </v-flex>
        <v-card-title>
          <v-flex xs12 class="text-xs-center">
            <div>
              <span class="headline">{{ inven.name }}</span>
            </div>
            <div class="d-flex">
              <div class="ml-2 grey--text text--darken-2">
                <span>Total: {{ inven.total }}</span>
              </div>
              <div class="ml-2 grey--text text--darken-2">
                <span>Working: {{ inven.working }}</span>
              </div>
              <div class="ml-2 grey--text text--darken-2">
                <span>Allotted: {{ inven.allotted }}</span>
              </div>
            </div>
          </v-flex>
        </v-card-title>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  head() {
    return {
      title: 'Inventory'
    }
  },
  computed: {
    ...mapState('inventory', ['inventory'])
  },
  created() {
    this.setInventoryRef({
      ref: this.$firebase.database().ref('inventory'),
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
  },
  methods: {
    ...mapActions('inventory', ['setInventoryRef'])
  }
}
</script>

<style scoped>
.inventory-header {
  color: black;
  text-align: center;
}
</style>
