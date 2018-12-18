<template>
  <div>
    <loading v-if="isLoading"></loading>
    <div v-else class="md-layout md-gutter md-alignment-top-center">
      <md-card style="max-width: 680px;">
        <md-card-media>
          <img src="/static/img/demo.jpg" alt="Demo">
          <md-button v-if="isAdmin" :to="{name: 'dashboard.recipes.edit', params: {id: recipe.id}}" class="md-fab md-fab-top-left">
            <md-icon>edit</md-icon>
          </md-button>
          <favorite-button :recipeId="recipe.id" class="favorite-button"></favorite-button>
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{ recipe.name }}</div>
          <div class="md-subhead">
            {{ recipe.owner }}
            <router-link v-if="isAdmin" tag="a" :to="{name: 'dashboard.users.edit', params: {id: recipe.user_id}}" class="edit-user-link">
              <md-icon>edit</md-icon>
            </router-link>
            <div class="md-subhead recipe-date">{{ recipe.created_at | timePassed }}</div>
            </div>
        </md-card-header>

        <md-card-actions>
          <rating :recipeId="recipe.id" :averageStars="recipe.average_stars"></rating>
        </md-card-actions>

        <md-card-content id="recipe-content">
          <div>
            <md-toolbar class="md-transparent">
              <h3 class="md-title">Ingredientes</h3>
            </md-toolbar>
            <br>
            <ul>
              <li v-for="(ingredient, index) in recipe.ingredients.split('\n')" :key="'ing' + index" v-if="ingredient">
                {{ ingredient }}
              </li>
            </ul>
            <br><br>
          </div>
          <div>
            <md-toolbar class="md-transparent">
              <h3 class="md-title">Modo de preparo</h3>
            </md-toolbar>
            <br>
            <ol>
              <li v-for="(direction, index) in recipe.directions.split('\n')" :key="'dir' + index">
                {{ direction }}
              </li>
            </ol>
            <br>
          </div>
        </md-card-content>
        <md-card-content>
          <comments :recipeId="recipe.id"></comments>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/shared/Loading.vue'
import Comments from '@/components/comments/Comments.vue'
import Rating from '@/components/shared/Rating.vue'
import FavoriteButton from '@/components/shared/FavoriteButton.vue'
import DateMixin from '@/app_library/date.js'
const axios = require('axios')

export default {
  mixins: [
    DateMixin
  ],
  data () {
    return {
      recipe: {},
      isLoading: true
    }
  },
  computed: {
    isAdmin () {
      return this.$store.state.isAdmin
    }
  },
  methods: {
    setRecipe (response) {
      this.recipe = response.data
      this.isLoading = false
      console.log(this.recipe)
    }
  },
  created () {
    axios
      .get('https://sabre-api.herokuapp.com/api/v1/recipes/' + this.$route.params.id)
      .then(this.setRecipe)
      .catch((error) => { console.log(error) })
  },
  components: {
    Loading,
    Comments,
    Rating,
    FavoriteButton
  }
}
</script>

<style scoped>
.edit-user-link .md-icon {
  font-size: 1.2em !important;
}

.recipe-date {
    text-align: right;
}

.favorite-button {
    top: 10px;
    right: 10px;
}
</style>
