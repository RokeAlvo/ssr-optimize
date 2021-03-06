export default {
  modern: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ssr-optimize',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://github.com/vuejs/vue/issues/9847#issuecomment-626154095
    ['~/modules/js-optimizer.js', {setOutputFilenames: true}]

  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: '/'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    filenames: {
      // chunk: ({isModern, isDev}) => isDev ? `[name].[id].js` : `[name].[id].[contenthash:7]${isModern ? '.modern' : ''}.js`
    }
  }
}
