import Vue from 'vue'
import App from './listApp'
import Axios from 'axios'

Vue.prototype.axios = Axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})