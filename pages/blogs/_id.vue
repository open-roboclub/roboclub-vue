<template>
  <v-row justify="center" dense>
    <PageLoader v-if="!blogs.length" />
    <v-col v-if="blogs.length" cols="6">
      <h1 class="font-weight-medium title-font">
        {{ blog.title }}
      </h1>
      <p class="subtitle-font">{{ blog.subtitle }}</p>
      <p class="font-weight-normal">
        {{ blog.name }}
      </p>
      <v-img :src="blog.link" />
      <div class="content-font">
        {{ blog.content }}
      </div>
    </v-col>
  </v-row>
</template>

<script>
import PageLoader from '@/components/widgets/PageLoader.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    PageLoader
  },
  data() {
    return {
      blog: {}
    }
  },
  computed: {
    ...mapState('blogs', ['blogs'])
  },
  created() {
    this.setBlogsRef()
  },
  updated() {
    this.select()
  },
  methods: {
    blogLoaded() {
      if (this.blog) {
        return false
      } else {
        return true
      }
    },
    ...mapActions('blogs', ['setBlogsRef']),
    select() {
      this.blogs.forEach(blog => {
        if (blog['.key'] === this.$route.params.id) {
          this.blog = blog
        }
      })
    }
  },
  head() {
    return {
      title: `Blog -- ${this.blog.title}`
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
