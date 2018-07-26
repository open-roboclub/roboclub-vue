<template>
  <v-container fluid>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 md10 lg8 xl6 offset-md1 offset-lg2 offset-xl3>
        <v-card color="cyan">
          <v-card-title primary-title>
            <h3 class="headline mb-0 white--text">Downloads</h3>
          </v-card-title>
          <v-progress-linear :indeterminate="loading" v-show="loading" color="cyan" background-color="cyan lighten-3"></v-progress-linear>
          <v-tabs color="cyan" dark slider-color="yellow" v-model="active">
            <v-tab v-for="tab in downloadTypes" :key="tab" :href="'#' + tab" ripple>
                {{ tab }}
            </v-tab>
            <v-tab-item v-for="download in downloads" :key="download.name" :id="download.name">
              <v-data-table
                v-bind:headers="headers"
                v-bind:items="download.items"
                item-key="name"
                class="elevation-1"
              >
                <template slot="headers" slot-scope="props">
                  <tr>
                    <th v-for="header in props.headers" :key="header.text" class="text-xs-left">
                      {{ header.text }}
                    </th>
                  </tr>
                </template>
                <template slot="items" slot-scope="props">
                  <tr>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.file }}</td>
                    <td><div v-if="props.item.size">{{ fileSizeSI(props.item.size) }}</div></td>
                    <td><a v-if="props.item.url" :href="props.item.url" target="_blank">
                      <v-btn color="pink" dark small fab>
                        <v-icon>cloud_download</v-icon>
                      </v-btn>
                    </a></td>
                  </tr>
                </template>
              </v-data-table>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
  a {
    text-decoration: none;
  }
</style>

<script>
  import Vuex from 'vuex'

  export default {
    data () {
      return {
        loading: true,
        active: null,
        headers: [
          {
            text: 'File',
            value: 'file'
          },
          { text: 'Name', value: 'name' },
          { text: 'File Size', value: 'size' },
          { text: 'URL', value: 'url' }
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    },
    computed: Vuex.mapGetters(['downloads', 'downloadTypes']),
    methods: {
      fileSizeSI(a,b,c,d,e) {
        a = parseInt(a)
        return (b=Math,c=b.log,d=1e3,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2) +' '+(e?'kMGTPEZY'[--e]+'B':'Bytes')
      }
    },
    created () {
      this.$store.dispatch('setDownloadsRef', {
        ref: this.$firebase.database().ref('downloads'),
        callbacks: {
          readyCallback: snapshot => {
            this.loading = false
            this.active = (Object.keys(snapshot.val())[0])
          },
          cancelCallback: error => {
            this.loading = false
          }
        }
      })
    }
  }

</script>
