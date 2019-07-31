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
      <v-flex xs12 class="text-xs-center">
        <v-card color="#F5F5F5">
          <v-card-title primary-title>
            <h3 class="headline mb-0 black--text">
              Microcontrollers
            </h3>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="inventory.microcontroller"
            hide-default-footer
            class="elevation-1 mb-2"
          >
            <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.total }}</td>
              <td>{{ props.item.working }}</td>
              <td>{{ props.item.allotted }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <v-card color="#F5F5F5">
          <v-card-title primary-title>
            <h3 class="headline mb-0 black--text">
              Sensors
            </h3>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="inventory.sensors"
            hide-default-footer
            class="elevation-1 mb-2"
          >
            <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.total }}</td>
              <td>{{ props.item.working }}</td>
              <td>{{ props.item.allotted }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <v-card color="#F5F5F5">
          <v-card-title primary-title>
            <h3 class="headline mb-0 black--text">
              Wires
            </h3>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="inventory.wires"
            hide-default-footer
            class="elevation-1 mb-2"
          >
            <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.total }}</td>
              <td>{{ props.item.working }}</td>
              <td>{{ props.item.allotted }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
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
  data() {
    return {
      headers: [
        { text: 'Name', align: 'center', value: 'name' },
        { text: 'Total', align: 'center', value: 'total' },
        { text: 'Working', align: 'center', value: 'working' },
        { text: 'Allotted', align: 'center', value: 'allotted' }
      ]
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
