<template>
  <v-app light>
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems" v-if="isAuth(item)" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-subheader inset>More</v-subheader>
        <v-list-tile v-for="item in moreItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">AMU RoboClub</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" v-if="isAuth(item)" :key="item.title" :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-menu bottom left class="hidden-xs-only">
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="item in moreItems" :key="item.title" :to="item.link">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
        <main>
            <router-view></router-view>
        </main>
    </v-content>
  </v-app>
</template>

<script>
  import Vuex from 'vuex'

  export default {
    computed: Vuex.mapState(['user']),
    methods: {
      isAuth(item) {
        if (item.auth === undefined)
          return true
        else if (!item.auth && !this.user)
          return true
        return item.auth && this.user
      }
    },
    data () {
      return {
        sideNav: false,
        menuItems: [
          { icon: 'group', title: 'Team', link: '/team' },
          { icon: 'build', title: 'Projects', link: '/projects' },
          { icon: 'notifications', title: 'News', link: '/news' },
          { icon: 'person', title: 'Profile', link: '/profile', auth: true },
          { icon: 'lock_open', title: 'Sign In', link: '/signin', auth: false }
        ],
        moreItems: [
          { icon: 'android', title: 'Robocon', link: '/robocon' },
          { icon: 'file_download', title: 'Downloads', link: '/downloads' },
          { icon: 'monetization_on', title: 'Contributions', link: '/contributions' }
        ]
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
