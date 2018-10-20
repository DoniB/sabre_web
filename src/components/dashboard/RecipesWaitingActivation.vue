<template>
  <dashboard-frame :title="title">
    <div>
      <loading v-if="loading"></loading>
      <recipe-card v-else :showAdminEdit="true" v-for="recipe in recipes" :key="'recipe' + recipe.id" :recipe="recipe"></recipe-card>
    </div>
  </dashboard-frame>
</template>

<script>
import Frame from './Frame.vue'
import RecipeCard from '@/components/shared/RecipeCard.vue'
import CenterContent from '@/components/shared/CenterContent.vue'
import Loading from '@/components/shared/Loading.vue'
const axios = require('axios')

export default {
  data () {
    return {
      title: 'Receitas Para Liberar',
      loading: true,
      recipes: []
    }
  },
  components: {
    dashboardFrame: Frame,
    recipeCard: RecipeCard,
    centerContent: CenterContent,
    Loading
  },
  created () {
    let token = this.$cookie.get('SecureToken')
    axios
      .get('https://sabre-api.herokuapp.com/api/v1/users/recipe?status=waiting_activation', {
        headers: { 'X-Secure-Token': token }
      })
      .then((response) => {
        this.recipes = response.data
        this.loading = false
      })
      .catch((error) => { console.log(error) })
  }
}
</script>
