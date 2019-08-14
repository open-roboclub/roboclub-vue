const pkg = require('./package')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: 'AMU RoboClub',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ddd' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/firebase'],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa'],

  devModules: ['@nuxtjs/vuetify'],

  vuetify: {
    customVariables: ['~/assets/variables.scss']
  },

  /*
   ** Build configuration
   */
  build: {
    extractCSS: isProduction,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
