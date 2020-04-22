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
      <nuxt-link :to="addLink()" style="text-decoration: none" v-if="userUid()">
        <v-btn fab dark class="cyan">
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </nuxt-link>
    </v-row>
    <v-row justify="center">
      <v-col v-for="blog in blogs" v-bind:key="blog['.key']" cols="12" lg="7">
        <v-card width="100%">
          <v-row>
            <v-col cols="7">
              <v-card-title class="title">{{ blog.title }}</v-card-title>
              <v-card-subtitle id="content">{{
                blog.subtitle
              }}</v-card-subtitle>
              <v-card-text>{{ blog.name }}</v-card-text>
              <nuxt-link
                :to="blogLink(blog['.key'])"
                class="mb-0"
                style="text-decoration: none"
              >
                <v-btn color="green darken-1" text>
                  Open
                </v-btn>
              </nuxt-link>
              <v-btn
                class="red--text"
                text
                v-if="user.uid === blog.uid"
                @click="deleteBlog(blog['.key'])"
              >
                Delete
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-img :src="blog.link" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageLoader from '@/components/widgets/PageLoader.vue'
import { db } from '@/plugins/firebase'
import { mapState, mapActions } from 'vuex'

export default {
  /* eslint-disable */
    components: {
      PageLoader
    },
    created(){
      this.setBlogsRef(),
      this.setBloggersRef()
    },
    computed:{
      ...mapState(['user']),
      ...mapState('blogs', ['blogs']),
      ...mapState('blogs', ['bloggers'])
    },
    methods:{
        ...mapActions('blogs', ['setBlogsRef']),
        ...mapActions('blogs', ['setBloggersRef']),
        deleteBlog(id)
        {
          db.ref(`blogs/main/${id}`).remove()
        },
        addLink()
        {
          return '/blogs/add'
        },
        blogLink(id)
        {
            return `/blogs/${id}`
        },
        async userUid()
        {
          const User = await this.user
          this.bloggers.forEach(blogger => {
            if(blogger['.key'] === User.uid)
            {
              return true
            }
          })   
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