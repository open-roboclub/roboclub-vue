<template>
  <v-row justify="center" dense>
    <PageLoader v-if="!blogs.length" />
    <v-col v-if="blogs.length" cols="6">
      <h1 class="font-weight-medium title-font">
        {{ selectedBlog.title }}
      </h1>
      <p class="subtitle-font">
        {{ selectedBlog.subtitle }}
      </p>
      <p class="font-weight-normal">
        {{ selectedBlog.name }}
      </p>
      <v-img :src="selectedBlog.link" />
      <div class="content-font">
        {{ selectedBlog.content }}
      </div>
    </v-col>
  </v-row>
</template>

<script>
import PageLoader from '@/components/widgets/PageLoader.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    PageLoader
  },
  computed: {
    ...mapState('blogs', ['selectedBlog', 'blogs'])
  },
  created() {
    this.setBlogsRef()
  },
  methods: {
    ...mapActions('blogs', ['setBlogsRef'])
  },
  head() {
    return {
      // title: `Blog -- ${this.selectedBlog.title}`
    }
  }
}
</script>

<style lang="stylus" scoped>
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
    width 100%
</style>
