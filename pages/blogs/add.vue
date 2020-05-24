<template>
  <div v-if="!preview">
    <v-row>
      <v-col cols="6" class="mx-auto">
        <v-text-field
          v-model="blogItem.title"
          label="Enter Title of your blog"
        ></v-text-field>
        <v-text-field
          v-model="blogItem.subtitle"
          label="Enter Subtitle"
        ></v-text-field>
        <v-text-field
          v-model="blogItem.link"
          label="Enter Image Link"
        ></v-text-field>
        <v-textarea
          v-model="blogItem.content"
          name="input-7-1"
          label="Enter Blog"
        ></v-textarea>
        <v-btn v-if="user != null" text @click="preview = true">Next</v-btn>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <v-row justify="center" dense>
      <v-col cols="6">
        <h1 class="font-weight-medium title-font">{{ blogItem.title }}</h1>
        <p class="subtitle-font">{{ blogItem.subtitle }}</p>
        <p class="font-weight-normal">{{ user['displayName'] }}</p>
        <v-img :src="blogItem.link" />
        <div class="content-font">
          <p>{{ blogItem.content }}</p>
        </div>
        <br />
        <nuxt-link to="/blogs" style="text-decoration: none">
          <v-btn text @click="addBlog()">Proceed</v-btn>
        </nuxt-link>
        <v-btn text @click="preview = false">Make Changes</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      value: false,
      preview: false
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters('blogs', ['blogs']),
    ...mapState('blogs', ['blogItem'])
  },
  created() {},
  methods: {
    ...mapActions('blogs', ['addBlog'])
  }
}
</script>

<style lang="stylus" scoped>
.help
    height 500px;
    overflow scroll;
img
    width 100%;
.title-font
    font-size 40px;
    font-family Georgia;
    font-weight Bold;
.subtitle-font
    font-size 20px;
    color grey;
.content-font
    font-size 23px;
    font-family 'Times New Roman', Times, serif
</style>
