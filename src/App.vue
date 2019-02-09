<template>
  <v-app light>
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          v-if="isAuth(item)"
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-subheader inset>More</v-subheader>
        <v-list-tile
          v-for="item in moreItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"
      >
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <div class="logo">
            <span class="amu">amu</span> <span class="roboclub">roboclub</span>
          </div>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          v-if="isAuth(item)"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-menu bottom left class="hidden-xs-only">
        <v-btn icon slot="activator">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="item in moreItems"
            :key="item.title"
            :to="item.link"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <main><router-view></router-view></main>
      <template>
        <div class="space"></div>
        <v-footer dark height="auto" class="footer">
          <v-card class="flex" flat tile>
            <v-card-title class="grey lighten-1">
              <strong class="subheading"
                ><strong
                  ><a
                    href="https://github.com/open-roboclub/roboclub-vue/graphs/contributors"
                    class="dev"
                    ><v-icon size="24px" color="black">mdi-worker</v-icon
                    ><span class="dev">Developers: </span></a
                  >
                  <a
                    href="https://github.com/iamareebjamal"
                    target="_blank"
                    class="dev"
                    >Areeb Jamal</a
                  >
                  <span class="dev"> | </span>
                  <a
                    href="https://github.com/Haider8"
                    target="_blank"
                    class="dev"
                    >Haider Ali</a
                  ></strong
                ></strong
              >
              <v-spacer></v-spacer>
              <v-btn
                v-for="icon in icons"
                :key="icon.name"
                class="mx-3"
                dark
                icon
              >
                <a
                  :href="icon.link"
                  target="_blank"
                  style="text-decoration: none; color: black"
                >
                  <v-icon size="24px">{{ icon.name }}</v-icon>
                </a>
              </v-btn>
            </v-card-title>
            <v-card-actions class="grey darken-3 justify-center">
              &copy;{{ getDate }} — <strong>AMURoboclub</strong>
            </v-card-actions>
          </v-card>
        </v-footer>
      </template>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  metaInfo: {
    title: 'AMU RoboClub',
    titleTemplate: '%s | AMU RoboClub'
  },
  computed: {
    getDate() {
      return (
        new Date().getFullYear() + '-' + ((new Date().getFullYear() + 1) % 100)
      )
    },
    ...mapState(['user'])
  },
  methods: {
    isAuth(item) {
      if (item.auth === undefined) return true
      else if (!item.auth && !this.user) return true
      return item.auth && this.user
    }
  },
  data() {
    return {
      sideNav: false,
      menuItems: [
        { icon: 'mdi-account-multiple', title: 'Team', link: '/team' },
        { icon: 'mdi-wrench', title: 'Projects', link: '/projects' },
        { icon: 'mdi-bell', title: 'News', link: '/news' },
        { icon: 'mdi-account', title: 'Profile', link: '/profile', auth: true },
        {
          icon: 'mdi-lock-open',
          title: 'Sign In',
          link: '/signin',
          auth: false
        }
      ],
      moreItems: [
        { icon: 'mdi-android', title: 'Robocon', link: '/robocon' },
        { icon: 'mdi-robot', title: 'RoboVoyage', link: '/robovoyage' },
        { icon: 'mdi-cloud-download', title: 'Downloads', link: '/downloads' },
        {
          icon: 'mdi-coin',
          title: 'Contributions',
          link: '/contributions'
        }
      ],
      icons: [
        {
          name: 'mdi-facebook',
          link: 'https://www.facebook.com/groups/amuroboculb/'
        },
        {
          name: 'mdi-youtube',
          link: 'https://www.youtube.com/channel/UCKTQZXhxAWfhz1Mb8c2UKTg'
        },
        {
          name: 'mdi-google-plus',
          link: 'https://plus.google.com/117931649297311148189'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.logo
  border-radius 5px
  overflow hidden

.logo > .amu, .logo > .roboclub
  padding 5px

.logo > .amu
  background-color black
  color white

.logo > .roboclub
  background-color rgba(0, 0, 0, 0.07)

.footer
  position absolute
  bottom 0px
  width 100%

.space
  margin-top 100px

.dev
  text-decoration none
  color black
</style>
