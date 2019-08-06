<template>
  <v-row>
    <v-container class="text-center">
      <v-progress-circular
        :size="size * 10"
        :width="size"
        :color="color"
        indeterminate
      />
    </v-container>
  </v-row>
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
