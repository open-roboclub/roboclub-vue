<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <div class="headline">{{ newsUpdate.title ? newsUpdate.title : 'News Update' }}</div>
      </div>
    </v-card-title>
    <div class="pr-3 pl-3 pb-3">
      <div class="grey--text text--darken-3">{{ newsUpdate.date }}</div>
      <br>
      <xmp>{{ newsUpdate.notice }}</xmp>
    </div>
    <v-card-actions>
      <v-btn flat class="orange--text" v-if="newsUpdate.link" :href="newsUpdate.link" target="_blank">Link</v-btn>
      <v-btn flat class="blue--text" v-if="isAdmin" @click.stop="$emit('edit')">Edit</v-btn>
      <v-btn flat class="red--text" v-if="isAdmin" @click.stop="$emit('delete')">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['newsUpdate', 'isAdmin']
}
</script>

<style lang="stylus" scoped>
xmp
  white-space pre-wrap
  word-wrap break-word
</style>
