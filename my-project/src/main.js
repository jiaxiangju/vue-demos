// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './vuex/store'

Vue.config.productionTip = false

Vue.prototype.axios = Axios;//将axios挂载到prototype上，在组件中可以直接使用this.axios访问

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//可通过this.$store访问
  template: '<App/>',
  components: { App }
})
