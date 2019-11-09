<template>
  <v-card class="mb-3">
    <v-container>
      <v-row style="padding-right: 10px">
        <v-col cols="1" lg="2" xl="1" style="min-width: 40px">
          <v-icon left x-large color="black">
            mdi-newspaper
          </v-icon>
        </v-col>
        <v-col cols="11" lg="10" xl="11">
          <div class="notice">{{ news.notice }}</div>
          <br />
          <div class="body-2 grey--text text--darken-3">
            {{ news.date }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    news: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.notice {
  white-space: pre-wrap;
}
</style>
