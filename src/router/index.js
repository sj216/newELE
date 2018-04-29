import Vue from 'vue'
import VueRouter from 'vue-router'
import ratings from '@/components/ratings/ratings'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'

Vue.use(VueRouter)

export default new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
})
