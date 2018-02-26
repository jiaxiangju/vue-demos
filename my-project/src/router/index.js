import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyGrid from '@/page/MyGrid'
import UserForm from '@/page/UserForm'
import UserShow from '@/page/UserShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: MyGrid
    }, {
      path: '/grid',
      name: 'userGrid',
      component: MyGrid
    }, {
      path: '/userForm/:id',
      name: 'userForm',
      component: UserForm
    }, {
    	path: '/userShow/:id',
    	name: 'userShow',
    	component : UserShow
    }, {
      path: '/welcome',
      mane: 'welcome',
      component: HelloWorld
    }
  ]
})
