<template>
  <v-card width="100%">
    <v-row>
      <v-col cols="7">
        <v-card-title class="title">{{ blog.title }}</v-card-title>
        <v-card-subtitle id="content">{{ blog.subtitle }}</v-card-subtitle>
        <v-card-text>{{ blog.name }}</v-card-text>
        <nuxt-link
          :to="blogLink(blog['.key'])"
          class="mb-0"
          style="text-decoration: none"
        >
          <v-btn color="green darken-1" text @click="getBlog(blog)">
            Open
          </v-btn>
        </nuxt-link>
        <div>
          <v-btn class="red--text" text @click="deleteBlog(blog['.key'])">
            Delete
          </v-btn>
        </div>
      </v-col>
      <v-col cols="4">
        <v-img :src="blog.link" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['blog'],
  methods: {
    ...mapActions('blogs', ['deleteBlog', 'getBlog']),
    blogLink(id) {
      return `/blogs/${id}`
    }
  }
}
</script>

<style></style>
