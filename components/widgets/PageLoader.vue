<template>
  <v-layout row wrap>
    <v-container class="text-xs-center">
      <v-progress-circular
        :size="size * 10"
        :width="size"
        color="grey"
        indeterminate
      />
    </v-container>
  </v-layout>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 5
    },
    color: {
      type: String,
      default: 'grey'
    }
  }
}
</script>
