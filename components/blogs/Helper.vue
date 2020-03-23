<template>
  <v-overlay :absolute="true" :opacity="0.5" :value="value">
    <v-card-title>Guide for styling your Blog</v-card-title>
    <v-btn @click="this.$emit('valueAlter', false)"></v-btn>
  </v-overlay>
</template>

<script>
export default {
  props: ['value']
}
</script>

<style></style>
