import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Bootstrap from 'bootstrap'
import jQuery from 'vue-jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(jQuery)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  render: h => h('App')
})