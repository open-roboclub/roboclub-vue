<template>
  <div :key="key">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="blue-grey white--text">
          <div class="text-center headline pt-4 pb-4">
            Blogs Section
          </div>
        </v-card>
      </v-col>
    </v-row>
    <PageLoader v-show="!blogs.length" />
    <v-row justify="center">
      <div v-if="isBlogger()">
        <nuxt-link v-if="user" to="/blogs/add" style="text-decoration: none">
          <v-btn v-if="blogger" fab dark class="cyan">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </nuxt-link>
      </div>
    </v-row>
    <v-row justify="center">
      <v-col v-for="blog in blogs" :key="blog['.key']" cols="12" lg="7">
        <singleBlog :blog="blog" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import singleBlog from '@/components/blogs/singleBlog.vue'
import PageLoader from '@/components/widgets/PageLoader.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    PageLoader,
    singleBlog
  },
  data() {
    return {
      buttonShow: false
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState('blogs', ['blogger']),
    ...mapState('blogs', ['blogs'])
  },
  created() {
    this.setBlogsRef()
    this.isBlogger()
  },
  methods: {
    ...mapActions('blogs', ['setBlogsRef', 'isBlogger']),
    blogLink(id) {
      return `/blogs/${id}`
    }
  },
  head() {
    return {
      title: 'Blogs'
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
    font-size 10px;
.blog
    border-bottom 2px;
</style>
