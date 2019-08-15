<template>
  <v-data-table
    :headers="headers"
    :items="download.items"
    item-key="name"
    class="downloads-table elevation-1"
  >
    <template v-slot:item.size="{ item }">
      <v-chip v-if="item.size" color="success caption">
        {{ fileSizeSI(item.size) }}
      </v-chip>
    </template>

    <template v-slot:item.url="{ item }">
      <a
        v-if="item.url"
        class="download-link"
        :href="item.url"
        target="_blank"
        rel="noopener"
      >
        <v-btn color="pink" dark small fab>
          <v-icon size="18">mdi-cloud-download</v-icon>
        </v-btn>
      </a>
    </template>
  </v-data-table>
</template>

<script>
import headers from './headers'

export default {
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
  },
  methods: {
    fileSizeSI(a, b, c, d, e) {
      a = parseInt(a)
      return (
        +((b = Math),
        (c = b.log),
        (d = 1e3),
        (e = (c(a) / c(d)) | 0),
        a / b.pow(d, e)).toFixed(2) +
        ' ' +
        (e ? 'kMGTPEZY'[--e] + 'B' : 'B')
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
.download-link
  text-decoration none
</style>

<style>
.downloads-tab--size {
  min-width: 100px;
}
</style>
