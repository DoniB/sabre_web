<template>
  <dashboard-frame :title="title">
    <div>
      <loading v-if="loading"></loading>
      <div v-else>
        <div class="md-layout">
          <div class="md-size-80 recipe-filter">
            <md-radio v-model="recipesFilter" value="all">Todas As Receitas</md-radio>
            <md-radio v-model="recipesFilter" value="waiting_activation">Receitas Para Aprovar</md-radio>
            <md-radio v-model="recipesFilter" value="my">Minhas Receitas</md-radio>
          </div>
        </div>
        <recipe-card :showAdminEdit="true" v-for="recipe in recipes" :key="'recipe' + recipe.id" :recipe="recipe"></recipe-card>
      </div>
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
      recipes: [],
      recipesFilter: 'waiting_activation'
    }
  },
  computed: {
    isAdmin () {
      return this.$store.state.isAdmin
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

<style scoped>
div.recipe-filter {
  padding: 15px;
}

div.recipe-filter .md-radio {
  padding: 10px;
  border: 1px solid #aaaaaa;
  border-radius: 15px;
}
</style>
