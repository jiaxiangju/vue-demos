import Vue from 'vue';
import Router from 'vue-router';
import Goods from '@/components/goods/goods';
import Ratings from '@/components/ratings/ratings';
import Seller from '@/components/seller/seller';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',//路由激活class，默认为router-link-active
  routes: [
  	{
  		path: '/',
  		component: Goods
  	},
    {
      path: '/c-goods',
      name: 'Goods',
      component: Goods
    },{
      path: '/c-ratings',
      name: 'Ratings',
      component: Ratings
    },{
      path: '/c-seller',
      name: 'Seller',
      component: Seller
    }
  ]
});
