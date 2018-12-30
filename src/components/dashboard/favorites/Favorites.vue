<template>
  <dashboard-frme>
    <div>
      <loading v-if="loading"></loading>
      <div v-else class="md-layout md-alignment-top-center">
        <recipe-card
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
        ></recipe-card>
      </div>
    </div>
  </dashboard-frme>
</template>

<script>
import Frame from '@/components/dashboard/Frame.vue'
import Loading from '@/components/shared/Loading.vue'
import RecipeCard from '@/components/shared/RecipeCard.vue'

export default {
  data() {
    return {
      loading: true,
      recipes: []
    }
  },
  components: {
    DashboardFrme: Frame,
    Loading,
    RecipeCard
  },
  created() {
    this.remote.users.favorites.index(
      this.$store.state.secureToken,
      response => {
        this.recipes = response.data
        this.loading = false
      },
      error => console.log(error)
    )
  }
}
</script>
