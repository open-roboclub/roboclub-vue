<template>
  <v-data-table
    :headers="headers"
    :items="download.items"
    item-key="name"
    class="elevation-1"
  >
    <template slot="headers" slot-scope="props">
      <tr>
        <th
          v-for="header in props.headers"
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

export default {
  components: {
    DownloadItem
  },
  props: ['download', 'headers']
}
</script>
