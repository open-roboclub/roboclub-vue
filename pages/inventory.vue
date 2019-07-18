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
        v-for="inven in inventory"
        :key="inven.name"
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
export default {
  data() {
    return {
      inventory: [
        {
          name: 'Arduino Uno',
          total: 5,
          working: 5,
          allotted: 3,
          thumbnail:
            'https://www.trossenrobotics.com/shared/images/PImages/C-400-DEV-A000046-a.jpg'
        },
        {
          name: 'Raspberry Pi',
          total: 4,
          working: 4,
          allotted: 2,
          thumbnail:
            'https://images-na.ssl-images-amazon.com/images/I/4133JwedpXL._SX466_.jpg'
        },
        {
          name: 'GTCRL-Conroller',
          total: 6,
          working: 6,
          allotted: 3,
          thumbnail:
            'https://cdn.tindiemedia.com/images/resize/soCiv6E6RSsS174XSd4FinOVJsE=/p/fit-in/1032x688/filters:fill(fff)/i/16356/products/2018-03-10T04%3A10%3A28.210Z-GMSV1_1.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.inventory-header {
  color: black;
  text-align: center;
}
</style>
