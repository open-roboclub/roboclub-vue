<template>
  <tr>
    <td>{{ item.name }}</td>
    <td>{{ item.file }}</td>
    <td>
      <div v-if="item.size">
        {{ fileSizeSI(item.size) }}
      </div>
    </td>
    <td>
      <a v-if="item.url" :href="item.url" target="_blank">
        <v-btn color="pink" dark small fab>
          <v-icon>mdi-cloud-download</v-icon>
        </v-btn>
      </a>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    fileSizeSI(a, b, c, d, e) {
      a = parseInt(a)
      return (
        ((b = Math),
        (c = b.log),
        (d = 1e3),
        (e = (c(a) / c(d)) | 0),
        a / b.pow(d, e)).toFixed(2) +
        ' ' +
        (e ? 'kMGTPEZY'[--e] + 'B' : 'Bytes')
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
a
  text-decoration none
</style>
