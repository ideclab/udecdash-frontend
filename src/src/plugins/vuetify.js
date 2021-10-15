import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify)
import es from 'vuetify/lib/locale/es'
Vue.component('my-component', {
  methods: {
    changeLocale () {
      this.$vuetify.lang.current = 'es'
    },
  },
})
export default new Vuetify({
  treeShake: true,
  defaultAssets: {
    font: {
      family: 'Lato'
    }
  },
  icons: {
    iconfont: 'mdi' // 'mdi' ||  || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  lang: {
    locales: { es },
    current: 'es',
  },

})
