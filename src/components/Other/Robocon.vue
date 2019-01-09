<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs10 sm6 offset-sm3 offset-xs1>
        <v-card class="mt-0 mb-3" color="rgb(77, 77, 255)">
          <v-card-text>
            <div>
              <h1 class="robocon-header">Robocon</h1>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6 class="text-sm-center text-md-left">
        <v-card color="success">
          <v-card-title primary-title>
            <div>
              <h1 class="heading mb-0" style="color: white;">Introduction</h1>
            </div>
          </v-card-title>
        </v-card>
        <v-card>
          <v-img
         src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
         aspect-ratio="2.75"
       ></v-img>
        </v-card>
        <v-card class="mb-3">
          <v-card-text>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12  md6 class="text-sm-center md-right">
        <v-card class="ml-3">
          <v-card class="mb-3">
              <v-carousel delimiter-icon="stop">
    	    			<v-carousel-item
    	      			v-for="item in items"
    	      			:key="item.id"
    	      			:src="item.imageUrl">
    	   				</v-carousel-item>
   				    </v-carousel>
            </v-card>
          <v-card color="rgb(211, 211, 211)">
            <v-card-title primary-title>
              <div>
                <h1 class="heading mb-0">About</h1>
              </div>
            </v-card-title>
          </v-card>
          <v-card>
            <v-card-text>
              <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                   do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                   Ut enim ad minim veniam, quis nostrud exercitation ullamco
                   laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                   irure dolor in reprehenderit in voluptate velit esse cillum
                   dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                   cupidatat non proident, sunt in culpa qui officia deserunt
                   mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                   do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                   Ut enim ad minim veniam, quis nostrud exercitation ullamco
                   laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                   irure dolor in reprehenderit in voluptate velit esse cillum
                   dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                   cupidatat non proident, sunt in culpa qui officia deserunt
                   mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                   do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                   Ut enim ad minim veniam, quis nostrud exercitation ullamco
                   laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                   irure dolor in reprehenderit in voluptate velit esse cillum
                   dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                   cupidatat non proident, sunt in culpa qui officia deserunt
                   mollit anim id est laborum.</p>
              </div>
            </v-card-text>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  metaInfo: {
    title: 'Robocon'
  },
  computed: {
    items() {
      return this.$store.getters.imgItems
    }
  }
}
</script>

<style scoped>
.robocon-header {
  color: white;
  text-align: center;
}
</style>
