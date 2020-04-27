<template>
  <div v-if="!preview">
    <v-row>
      <v-col cols="6" class="mx-auto">
        <v-text-field
          label="Enter Title of your blog"
          v-model="title"
        ></v-text-field>
        <v-text-field label="Enter Subtitle" v-model="subtitle"></v-text-field>
        <v-text-field label="Enter Image Link" v-model="link"></v-text-field>
        <v-textarea
          name="input-7-1"
          label="Enter Blog"
          v-model="content"
        ></v-textarea>
        <v-btn text @click="setUser()" v-if="team.length">Next</v-btn>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <v-row justify="center" dense>
      <v-col cols="6">
        <h1 class="font-weight-medium title-font">{{ title }}</h1>
        <p class="subtitle-font">{{ subtitle }}</p>
        <p class="font-weight-normal">{{ this.user.name }}</p>
        <v-img :src="link" />
        <div class="content-font">
          <p>{{ content }}</p>
        </div>
        <br />
        <nuxt-link to="/blogs" style="text-decoration: none">
          <v-btn text @click="writeBlog()">Proceed</v-btn>
        </nuxt-link>
        <v-btn text @click="preview = false">Make Changes</v-btn>
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
	data(){
		return{
      value: false,
			title: "",
			subtitle: "",
      content: "",
      count: 0,
      preview: false,
      link: "",
		}
  },
  computed: {
    ...mapState(['user']),
    ...mapState('blogs', ['blogs']),
    ...mapState('blogs', ['team'])
  },
  created() {
    this.setBlogsRef()
    this.setTeamRef()
  },
	methods:{
      ...mapActions('blogs', ['setBlogsRef', 'setTeamRef']),
      setUser(){
        let p = this.user.uid
        this.team.forEach(user => {
          if(p === user.uid)
          {
            this.user.name = user.name
            this.user.uid = user.uid
          }
        })
        this.preview = true
      },
			writeBlog() {
        db.ref(`blogs/main/${this.blogs.length}`).set({
            title: this.title,
            subtitle: this.subtitle,
            content: this.content,
            name: this.user.name,
            uid: this.user.uid,
            link: this.link
        });
    }
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