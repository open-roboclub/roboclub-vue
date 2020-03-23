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
      <nuxt-link
        :to="addLink()"
        style="text-decoration: none"
        v-if="bloggers.includes(user.uid)"
      >
        <v-btn fab dark class="cyan" v-on="on">
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </nuxt-link>
    </v-row>
    <v-row justify="center">
      <v-col v-for="blog in blogs" v-bind:key="blog.id" cols="12" lg="7">
        <v-card width="100%">
          <v-row>
            <v-col cols="7">
              <v-card-title class="title">{{ blog.title }}</v-card-title>
              <v-card-subtitle id="content">{{
                blog.subtitle
              }}</v-card-subtitle>
              <v-card-text>{{ blog.name }}</v-card-text>
              <nuxt-link
                :to="blogLink(blog.id)"
                class="mb-0"
                style="text-decoration: none"
              >
                <v-btn color="green darken-1" text>
                  Open
                </v-btn>
              </nuxt-link>
              <nuxt-link style="text-decoration: nonne" to="/team">
                <v-btn
                  class="red--text"
                  text
                  v-if="user.uid === blog.uid"
                  @click="deleteBlog(blog.id)"
                >
                  Delete
                </v-btn>
              </nuxt-link>
            </v-col>
            <v-col cols="4">
              <v-img :src="blog.image" />
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
import { auth } from '@/plugins/firebase'
import { mapState } from 'vuex'

export default {
  /* eslint-disable */
    components: {
      PageLoader
    },
    data(){
        return{
            image: "", 
            title: null,
            name: null,
            content: null,
            id: null,
            blogs: [],
            bloggers: [],
            isBlogger: false,
            key: 0,
            auth: auth
        }
    },
    computed:{
      ...mapState(['user'])
    },
    mounted(){
        this.getBlogs()
        this.check()
    },
    methods:{
        deleteBlog(id)
        {
          db.ref(`blogs/main/${id}`).remove()
          location.reload(true)
        },
        addLink()
        {
          return '/blogs/add'
        },
        blogLink(id)
        {
            return `/blogs/${id}`
        },
        async check()
        {
            /* eslint-disable */
            const bloggerRef = await db.ref('blogs/bloggers');
            let bloggers = [];
            let p = 0;
            bloggerRef.on('value', function(snapshot){
              for(const i in snapshot.val())
              {
                bloggers.push(i)
              }
            })
            this.bloggers = bloggers
            console.log(this.bloggers)
        },
        async getBlogs()
        {
            /* eslint-disable */
            const blogsRef = await db.ref('blogs/main');
            let blog = [];
            blogsRef.on('value', function(snapshot){
                for(const i in snapshot.val())
                  {
                    blog.push({
                        id: i,
                        name: snapshot.val()[i].name,
                        title: snapshot.val()[i].title,
                        subtitle: snapshot.val()[i].subtitle,
                        date: snapshot.val()[i].date,
                        image: snapshot.val()[i].link,
                        uid: snapshot.val()[i].uid}
                        );
                }
            });
            this.blogs = blog;
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