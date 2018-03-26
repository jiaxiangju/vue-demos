import Vue from 'vue'
import App from './formApp'
import Axios from 'axios'

Vue.prototype.axios = Axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})