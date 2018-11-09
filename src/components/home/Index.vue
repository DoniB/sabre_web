<template>
  <div>
    <loading v-if="isLoading"></loading>
    <div v-else class="md-layout md-alignment-top-center">
      <recipe-card v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"></recipe-card>
    </div>
    <div v-if="hasMore">
      <p style="text-align: center"><md-button class="md-accent" :disabled="isLoadingMore" @click="loadRecipes">Mais Receitas <md-icon>expand_more</md-icon></md-button></p>
    </div>
  </div>
</template>

<script>
import RecipeCard from '@/components/shared/RecipeCard.vue'
import Loading from '@/components/shared/Loading.vue'

export default {
  name: 'index',
  data () {
    return {
      recipes: [],
      isLoading: true,
      isLoadingMore: false,
      hasMore: false,
      page: 0
    }
  },
  components: {
    recipeCard: RecipeCard,
    loading: Loading
  },
  methods: {
    setRecipes (response) {
      response.data.forEach(element => {
        this.recipes.push(element)
      })
      this.isLoading = false
      this.isLoadingMore = false
      this.hasMore = response.data.length === 20
      this.page++
    },
    loadRecipes () {
      this.isLoadingMore = true

      let params = {
        page: this.page
      }

      if (this.$route.query.q) {
        params['q'] = this.$route.query.q
      }

      if (this.$route.params.id) {
        params['category'] = this.$route.params.id
      }

      this.remote.recipes.index(
        params,
        this.setRecipes,
        (error) => { console.log(error) }
      )
    }
  },
  created () {
    this.loadRecipes()
  },
  watch: {
    '$route' (to, from) {
      this.isLoading = true
      this.recipes = []
      this.page = 0
      this.loadRecipes({ q: to.query.q })
    }
  }
}
</script>
