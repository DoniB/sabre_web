import Vue from 'vue'
import Router from 'vue-router'
import PageIndex from '@/components/home/Index'
import PageSign from '@/components/PageSign'
import PageSendRecipe from '@/components/PageSendRecipe'
import PageNotFound from '@/components/PageNotFound'
import DashboardIndex from '@/components/dashboard/Index.vue'
import DashboardRecipesWaitingActivation from '@/components/dashboard/RecipesWaitingActivation.vue'
import DashboardRecipesWaitingActivationEdit from '@/components/dashboard/RecipesWaitingActivationEdit.vue'

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
    },
    {
      path: '/usuario',
      name: 'dashboardIndex',
      component: DashboardIndex,
      meta: { requiresAuth: true }
    },
    {
      path: '/usuario/receitas-para-liberar',
      name: 'dashboardRecipesWaitingActivation',
      component: DashboardRecipesWaitingActivation,
      meta: { requiresAuth: true }
    },
    {
      path: '/usuario/receitas-para-liberar/:id',
      name: 'DashboardRecipesWaitingActivationEdit',
      component: DashboardRecipesWaitingActivationEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '*', component: PageNotFound
    }
  ]
})
