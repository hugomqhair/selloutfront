import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import filtroPadro from './components/small/filtroPadro.vue'

import './plugins/bootstrap-vue'
import './plugins/axios'

Vue.config.productionTip = false
Vue.component('filtroPadro', filtroPadro)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
