<template>
  <dashboard-frame :title="title">
    <div>
      <loading v-if="loading"></loading>
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
        <recipe-card :showAdminEdit="true" v-for="recipe in recipes" :key="'recipe' + recipe.id" :recipe="recipe"></recipe-card>
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
      loading: true,
      recipes: [],
      recipesFilter: 'my',
      disableFilterWatch: true,
      searchQuery: ''
    }
  },
  computed: {
    isAdmin () {
      return this.$store.state.isAdmin
    }
  },
  methods: {
    loadRecipes () {
      this.loading = true

      const params = {}
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
      this.recipes = response.data
      this.loading = false
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
      this.disableFilterWatch = false
    }
    this.loadRecipes()
  },
  watch: {
    recipesFilter () {
      if (this.disableFilterWatch) return
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
