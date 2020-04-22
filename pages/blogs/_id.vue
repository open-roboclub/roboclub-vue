<template>
  <v-row justify="center" dense>
    <PageLoader v-if="!blogs.length" />
    <v-col cols="6" v-if="blogs.length">
      <h1 class="font-weight-medium title-font">
        {{ blog.title }}
      </h1>
      <p class="subtitle-font">{{ blog.subtitle }}</p>
      <p class="font-weight-normal">
        {{ blog.name }}
      </p>
      <v-img :src="blog.link" />
      <div class="content-font">
        <span v-html="blog.content"></span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import PageLoader from '@/components/widgets/PageLoader.vue'
import { mapActions, mapState } from 'vuex'

export default {
/* eslint-disable */
    components: {
      PageLoader
    },
    data(){
        return{
            blog: {}
        }
    },
    created(){
        this.setBlogsRef()
    },
    updated(){
      this.tst()
    },
    computed:{
        ...mapState('blogs', ['blogs'])
    },
    methods:{
    blogLoaded()
    {
      if(this.blog)
      {
        return false
      }
      else
      {
        return true
      }
    },
    ...mapActions('blogs', ['setBlogsRef']),
    async tst()
    {
        this.blogs.forEach(blog => {
          if(blog['.key'] === this.$route.params.id)
          {
            this.blog = blog
          }
        })
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