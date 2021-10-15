import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueApexCharts from 'vue-apexcharts'
import VueSimpleAlert from 'vue-simple-alert'
import Global from '../Global.js'
import ComponentReport from '@/assets/js/Components.js'
import VueTour from 'vue-tour'
import './assets/style/fonts.css'
import Session from './models/session'

Vue.prototype.$Session = new Session()

require('vue-tour/dist/vue-tour.css')
Vue.use(VueAxios, axios)
Vue.use(VueApexCharts)
Vue.use(VueSimpleAlert)
Vue.use(VueTour)

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false


Vue.mixin({
  methods: {
    workflowState: function({ module, item }) {
      if(module){
        return module
      }
      return item
    }
  }
})

Vue.directive('scroll', {
  inserted: function(el, binding) {
    let f = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})
new Vue({
  router,
  Global,
  ComponentReport,
  vuetify,
  render: h => h(App)
}).$mount('#app')
