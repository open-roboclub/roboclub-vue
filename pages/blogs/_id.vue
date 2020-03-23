<template>
  <v-row justify="center" dense>
    <v-col cols="6">
      <h1 class="font-weight-medium title-font">{{ title }}</h1>
      <p class="subtitle-font">{{ subtitle }}</p>
      <p class="font-weight-normal">{{ name }}</p>
      <v-img :src="image" />
      <div class="content-font">
        <span v-html="content"></span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { db } from '@/plugins/firebase.js'

export default {
/* eslint-disable */
    data(){
        return{
            title: "",
            subtitle: "",
            name: "",
            content: "",
            image: "https://cdn.vuetifyjs.com/images/cards/house.jpg"
        }
    },
    mounted(){
        this.getItems()
    },
    methods:{
    blogLink(id)
     {
         return `/blogs/${id}`
     },
     async getItems()
     {
        /* eslint-disable */
        const blogRef = await db.ref(`blogs/main/${this.$route.params.id}`);
        let name = null;
        let title = null;
        let content = null;
        let subtitle = null;
        let image = null;
        blogRef.on('value', function(snapshot){
            name = snapshot.val().name;
            title = snapshot.val().title;
            content = snapshot.val().content;
            subtitle = snapshot.val().subtitle;
            image = snapshot.val().link;
        });
        this.name = name;
        this.title = title;
        this.content = content;
        this.subtitle = subtitle;
        this.image = image;
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