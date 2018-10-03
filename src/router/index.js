import Vue from 'vue'
import Router from 'vue-router'
import PageIndex from '@/components/PageIndex'
import PageSign from '@/components/PageSign'
import PageSendRecipe from '@/components/PageSendRecipe'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: PageIndex
    },
    {
      path: '/sign',
      name: 'sign',
      component: PageSign
    },
    {
      path: '/usuario/enviar-receita',
      name: 'sendRecipe',
      component: PageSendRecipe,
      meta: { requiresAuth: true }
    }
  ]
})
