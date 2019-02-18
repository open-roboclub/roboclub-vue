<template>
  <v-data-table
    :headers="headers"
    :items="download.items"
    item-key="name"
    class="elevation-1"
  >
    <template slot="headers">
      <tr>
        <th
          v-for="header in headers"
          :key="header.text"
          class="text-xs-left"
        >
          {{ header.text }}
        </th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <DownloadItem :item="props.item" />
    </template>
  </v-data-table>
</template>

<script>
import DownloadItem from './Item'
import headers from './headers'

export default {
  components: {
    DownloadItem
  },
  props: {
    download: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      headers
    }
  }
}
</script>
