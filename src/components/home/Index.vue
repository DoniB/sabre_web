<template>
  <div>
    <loading v-if="isLoading"></loading>
    <div v-else>
      <recipe-card v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"></recipe-card>
    </div>
  </div>
</template>

<script>
import RecipeCard from '@/components/shared/RecipeCard.vue'
import Loading from '@/components/shared/Loading.vue'
const axios = require('axios')

export default {
  name: 'index',
  data () {
    return {
      recipes: [],
      isLoading: true
    }
  },
  components: {
    recipeCard: RecipeCard,
    loading: Loading
  },
  created () {
    axios
      .get('https://sabre-api.herokuapp.com/api/v1/recipes')
      .then((response) => {
        this.recipes = response.data
        this.isLoading = false
      })
      .catch((error) => { console.log(error) })
  }
}
</script>
