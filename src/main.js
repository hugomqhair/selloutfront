import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import filterAnoMes from './components/small/filterAnoMes.vue'

import './plugins/bootstrap-vue'
import './plugins/axios'

Vue.config.productionTip = false
Vue.component('filterAnoMes', filterAnoMes)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
