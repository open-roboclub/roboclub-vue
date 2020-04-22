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
          hint="Click Styling in order to know the styles"
          v-model="content"
        ></v-textarea>
        <v-btn text @click="setUser()" v-if="team.length">Next</v-btn>
        <v-btn text @click="value = true">Styling</v-btn>
      </v-col>
    </v-row>
    <v-overlay :absolute="true" :opacity="0.5" :value="value">
      <v-card color="white" class="black--text help">
        <v-card-title>Guide for styling your Blog</v-card-title>
        <ul>
          <li>
            In order to add an image in between the content, add these wherever
            you want the image to be added.<br />
            If https://yourImage.jpg is the image link(for example)<br />
            then add {{ image }} wherever you need that image to be added.
          </li>
          <li>
            In order to make a list of points, add ul tags and the li tags, in
            this way:-
            <pre>
            {{ list }}
            </pre>
          </li>
          <li>
            <p>
              In order to add a heading, add h1 tags in this way:- {{ heading }}
              <br />
              <span class="green--text">
                Hint:- You can use h1 to h6 in order of varying sizes, h1 being
                the largest and h6 being the smallest.
              </span>
            </p>
          </li>
          <li>
            <p>
              In order to make bold an inline content, add b tags in this way:-
              {{ bold }}
            </p>
          </li>
          <li>
            <p>
              In order to go to a new line, add br tag in the end of the line in
              this manner:-
              {{ brea }}
            </p>
          </li>
          <li>
            <p>
              In order to create a new paragraph, add p tag in the beginning and
              the end of the paragraph in this way:-<br />
              {{ paragraph }}.<br />
              <span class="red--text">
                Warning:- Don't use nested p tags, i.e., one p tag in another.
              </span>
            </p>
          </li>
        </ul>
        <v-btn @click="value = false" color="white" class="black--text"
          >Back
        </v-btn>
      </v-card>
    </v-overlay>
  </div>
  <div v-else>
    <v-row justify="center" dense>
      <v-col cols="6">
        <h1 class="font-weight-medium title-font">{{ title }}</h1>
        <p class="subtitle-font">{{ subtitle }}</p>
        <p class="font-weight-normal">{{ this.user.name }}</p>
        <v-img :src="link" />
        <div class="content-font">
          <span v-html="content"></span>
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
      image: '<img src="https://yourImage.jpg" width="100%"/>',
      heading: '<h1>Heading</h1> Normal text',
      brea: 'Whole Line <br/> Normal text',
      paragraph: '<p>Paragraph</p> Normal text',
      bold: '<b>Bold Text</b> Normal text',
      list: `<ul>
              <li>
                list item 1
              </li>
              <li>
                list item 2
              </li>
              <li>
                list item 3
              </li>
            </ul>`,
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