<template>
  <dashboard-frame :title="title">
    <div>
      <loading v-if="isLoading"></loading>
      <div v-else>
        <div class="md-layout" v-if="isAdmin">
          <div class="md-size-80 recipe-filter">
            <md-radio v-model="recipesFilter" value="all">Todas As Receitas</md-radio>
            <md-radio v-model="recipesFilter" value="waiting_activation">Receitas Para Aprovar</md-radio>
            <md-radio v-model="recipesFilter" value="my">Minhas Receitas</md-radio>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-size-80 recipe-filter">
            <md-field>
              <md-input @keypress.enter="loadRecipes" v-model="searchQuery" placeholder="Procurar por nome"></md-input>
              <md-button @click="loadRecipes" class="md-icon-button"><md-icon>search</md-icon></md-button>
            </md-field>
          </div>
        </div>
        <recipe-card :showAdminEdit="true" v-for="recipe in recipes" :key="'userRecipe' + recipe.id" :recipe="recipe"></recipe-card>
      </div>
      <div v-if="hasMore">
        <p style="text-align: center"><md-button class="md-accent" :disabled="isLoadingMore" @click="loadRecipes">Mais Receitas <md-icon>expand_more</md-icon></md-button></p>
      </div>
    </div>
  </dashboard-frame>
</template>

<script>
import Frame from '@/components/dashboard/Frame.vue'
import RecipeCard from '@/components/shared/RecipeCard.vue'
import CenterContent from '@/components/shared/CenterContent.vue'
import Loading from '@/components/shared/Loading.vue'

export default {
  data () {
    return {
      title: 'Receitas',
      recipes: [],
      recipesFilter: 'my',
      disableFilterWatch: true,
      searchQuery: '',
      isLoading: true,
      isLoadingMore: false,
      hasMore: false,
      page: 0
    }
  },
  computed: {
    isAdmin () {
      return this.$store.state.isAdmin
    }
  },
  methods: {
    loadRecipes () {
      this.isLoadingMore = true

      const params = {
        page: this.page
      }
      switch (this.recipesFilter) {
        case 'waiting_activation':
          params.status = 'waiting_activation'
        // eslint-disable-next-line
        case 'all':
          params.all_users = 1
      }
      if (this.searchQuery) {
        params.q = this.searchQuery
      }

      const token = this.$cookie.get('SecureToken')
      this.remote.users.recipe.index(
        token,
        params,
        this.recipesLoaded,
        (error) => console.log(error)
      )
    },
    recipesLoaded (response) {
      response.data.forEach(element => {
        this.recipes.push(element)
      })
      this.isLoading = false
      this.isLoadingMore = false
      this.hasMore = response.data.length === 20
      this.page++
      this.disableFilterWatch = false
    }
  },
  components: {
    dashboardFrame: Frame,
    recipeCard: RecipeCard,
    centerContent: CenterContent,
    Loading
  },
  created () {
    if (this.isAdmin) {
      this.recipesFilter = 'waiting_activation'
    }
    this.loadRecipes()
  },
  watch: {
    recipesFilter () {
      if (this.disableFilterWatch) return
      this.page = 0
      this.recipes = []
      this.isLoading = true
      this.loadRecipes()
    }
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
