<template>
  <div>
    <center-content v-if="loading">
      <md-progress-spinner :md-diameter="200" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
    </center-content>
    <div>
      <recipe-card v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"></recipe-card>
    </div>
  </div>
</template>

<script>
import RecipeCard from '@/components/shared/RecipeCard.vue'
import CenterContent from '@/components/shared/CenterContent.vue'
const axios = require('axios')

export default {
  name: 'index',
  data () {
    return {
      recipes: [],
      loading: true
    }
  },
  components: {
    recipeCard: RecipeCard,
    centerContent: CenterContent
  },
  created () {
    axios
      .get('https://sabre-api.herokuapp.com/api/v1/recipes')
      .then((response) => {
        this.recipes = response.data
        this.loading = false
        console.log(response)
      })
      .catch((error) => { console.log(error) })
  }
}
</script>
