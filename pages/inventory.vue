<template>
  <v-container>
    <v-row>
      <v-col cols="10" sm="6" offset-sm="3" offset="1">
        <v-card class="mt-0 mb-4" color="#C1FFC1">
          <v-card-text>
            <div>
              <h1 class="inventory-header">
                Inventory
              </h1>
            </div>
          </v-card-text>
          <v-progress-linear
            v-show="loading"
            :indeterminate="loading"
            color="#B9F6CA"
            background-color="#C1FFC1"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center mb-2">
        <v-card v-show="!loading">
          <v-tabs v-model="tab" color="#F5F5F5" centered>
            <v-tabs-slider color="#616161"></v-tabs-slider>

            <v-tab href="#tab-1">
              Microcontrollers
            </v-tab>

            <v-tab href="#tab-2">
              Sensors
            </v-tab>

            <v-tab href="#tab-3">
              Wires
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
              <v-card>
                <v-data-table
                  v-if="i == 1"
                  :headers="headers"
                  :items="inventory.microcontroller"
                  class="elevation-1 mb-2"
                >
                  <template v-slot:items="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.total }}</td>
                    <td>{{ props.item.working }}</td>
                    <td>{{ props.item.allotted }}</td>
                    <td>
                      {{ props.item.working - props.item.allotted }}
                    </td>
                  </template>
                </v-data-table>
                <v-data-table
                  v-if="i == 2"
                  :headers="headers"
                  :items="inventory.sensors"
                  class="elevation-1 mb-2"
                >
                  <template v-slot:items="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.total }}</td>
                    <td>{{ props.item.working }}</td>
                    <td>{{ props.item.allotted }}</td>
                    <td>
                      {{ props.item.working - props.item.allotted }}
                    </td>
                  </template>
                </v-data-table>
                <v-data-table
                  v-if="i == 3"
                  :headers="headers"
                  :items="inventory.wires"
                  class="elevation-1 mb-2"
                >
                  <template v-slot:items="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.total }}</td>
                    <td>{{ props.item.working }}</td>
                    <td>{{ props.item.allotted }}</td>
                    <td>
                      {{ props.item.working - props.item.allotted }}
                    </td>
                  </template>
                </v-data-table>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: true,
      tab: null,
      headers: [
        { text: 'Name', align: 'center', value: 'name' },
        { text: 'Total', align: 'center', value: 'total' },
        { text: 'Working', align: 'center', value: 'working' },
        { text: 'Allotted', align: 'center', value: 'allotted' },
        { text: 'Remaining', align: 'center', value: 'remaining' }
      ]
    }
  },
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
