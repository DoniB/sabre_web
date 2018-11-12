import Vue from 'vue'
import Router from 'vue-router'
import PageIndex from '@/components/home/Index'
import PageSign from '@/components/PageSign'
import PageSendRecipe from '@/components/dashboard/SendRecipe'
import PageNotFound from '@/components/PageNotFound'
import DashboardIndex from '@/components/dashboard/Index.vue'
import DashboardRecipesWaitingActivation from '@/components/dashboard/RecipesWaitingActivation.vue'
import DashboardRecipesWaitingActivationEdit from '@/components/dashboard/RecipesWaitingActivationEdit.vue'

const RecipeShow = () => import('@/components/recipe/Show.vue')
const DashboardUsers = () => import('@/components/dashboard/users/Users.vue')
const DashboardUsersEdit = () => import('@/components/dashboard/users/Edit.vue')
const DashboardUsersNew = () => import('@/components/dashboard/users/New.vue')

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
      path: '/painel/enviar-receita',
      name: 'sendRecipe',
      component: PageSendRecipe,
      meta: { requiresAuth: true }
    },
    {
      path: '/painel',
      name: 'dashboardIndex',
      component: DashboardIndex,
      meta: { requiresAuth: true }
    },
    {
      path: '/painel/receitas-para-liberar',
      name: 'dashboardRecipesWaitingActivation',
      component: DashboardRecipesWaitingActivation,
      meta: { requiresAuth: true }
    },
    {
      path: '/painel/receitas-para-liberar/:id',
      name: 'DashboardRecipesWaitingActivationEdit',
      component: DashboardRecipesWaitingActivationEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/receita/:id/:friendlyUrl',
      name: 'recipe.show',
      component: RecipeShow
    },
    {
      path: '/categoria/:id/:friendlyUrl',
      name: 'category',
      component: PageIndex
    },
    {
      path: '/painel/users',
      name: 'dashboard.users',
      component: DashboardUsers,
      meta: { requiresAuth: true }
    },
    {
      path: '/painel/users/:id/edit',
      name: 'dashboard.users.edit',
      component: DashboardUsersEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/painel/users/new',
      name: 'dashboard.users.new',
      component: DashboardUsersNew,
      meta: { requiresAuth: true }
    },
    {
      path: '*', component: PageNotFound
    }
  ]
})
