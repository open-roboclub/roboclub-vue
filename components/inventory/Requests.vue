<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="500">
      <template v-slot:activator="{ on }">
        <v-btn fab dark class="cyan" v-on="on">
          <v-icon dark>
            mdi-bell
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          Issue Requests
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-container v-for="(request, i) in requests" :key="i">
                <v-row>
                  <v-col cols="8">
                    {{ request.name }} would like to issue
                    {{ request.quantity }}
                    {{ request.itemName }}
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="2">
                    <v-row justify="center">
                      <v-col cols="1">
                        <v-icon
                          color="green darken-2"
                          @click="seenRequest(request['.key'])"
                          >mdi-check</v-icon
                        >
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="1">
                        <v-icon
                          color="red darken-2"
                          @click="seenRequest(request['.key'])"
                          >mdi-close</v-icon
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapGetters('inventory', ['requests'])
  },
  methods: {
    ...mapActions('inventory', ['seenRequest'])
  }
}
</script>

<style></style>
