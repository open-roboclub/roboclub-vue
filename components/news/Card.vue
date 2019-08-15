<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <div class="headline">
          {{ newsUpdate.title ? newsUpdate.title : 'News Update' }}
        </div>
      </div>
    </v-card-title>
    <div class="pa-4 pt-0">
      <div class="body-2 grey--text text--darken-3">
        {{ newsUpdate.date }}
      </div>
      <br />
      <xmp class="body-2">{{ newsUpdate.notice }}</xmp>
    </div>
    <v-card-actions>
      <v-btn
        v-if="newsUpdate.link"
        :href="newsUpdate.link"
        text
        class="orange--text"
        target="_blank"
        rel="noopener"
      >
        Link
      </v-btn>
      <v-btn v-if="isAdmin" text class="blue--text" @click.stop="$emit('edit')">
        Edit
      </v-btn>
      <v-btn
        v-if="isAdmin"
        text
        class="red--text"
        @click.stop="$emit('delete')"
      >
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    newsUpdate: {
      type: Object,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
xmp
  white-space pre-wrap
  word-wrap break-word
</style>
