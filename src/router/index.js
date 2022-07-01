import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Title from '@/views/Title'
import Image from '@/views/Image'
// 2、导入Cart组件
import Cart from '@/views/Cart'
 
Vue.use(Router)
 
export default new Router({
  mode: 'history',
  routes: [
    {
      	path: '/goods',
      	name: 'GoodsList',
      	component: GoodsList,
      	children: [
      		{
      	  		path: 'title',
          		name: 'title',
          		component:Title	
      		},
 
      		{
      	  		path: 'image',
          		name: 'image',
          		component:Image	
      		}
      	]
    },
    // 1、写入购物车组件
    {
    	path: '/cart',
      	component: Cart,
    }
  ]
})