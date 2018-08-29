// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import vueResource from 'vue-resource';
import App from './App';
import router from './router';
// import '../common/css/icon.css';

Vue.config.productionTip = false;

Vue.use(vueResource);

// 下面这行如果去掉，会报错，new Vue必须要一个new给一个对象，加上就可以
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
