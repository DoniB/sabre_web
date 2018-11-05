<template>
    <md-card>
        <md-card-media>
            <img src="/static/img/demo.jpg" alt="Demo">
        </md-card-media>
        <md-card-header>
            <div class="md-title">{{ recipe.name }}</div>
            <div class="md-subhead">{{ recipe.owner }}</div>
            <div class="md-layout md-alignment-top-right">
                <star-rating
                    :rating="recipe.average_stars"
                    :star-size="20"
                    rounded-corners
                    :show-rating="false"
                    :padding="1"
                    read-only>
                </star-rating>
            </div>
        </md-card-header>

        <md-card-expand>
            <md-card-actions md-alignment="space-between">
                <div>
                    <md-button :to="{ name: 'recipe.show', params: { id: recipe.id, friendlyUrl: friendlyUrl } }">Receita</md-button>
                    <md-button v-if="showAdminEdit"
                        :to="{ name: 'DashboardRecipesWaitingActivationEdit', params: {id: recipe.id} }">Editar</md-button>
                </div>

                <md-card-expand-trigger @click="showRecipe = !showRecipe">
                    <md-button>Ingredientes</md-button>
                </md-card-expand-trigger>
            </md-card-actions>

            <md-card-expand-content>
                <md-card-content v-html="ingredients">
                </md-card-content>
            </md-card-expand-content>

        </md-card-expand>
    </md-card>
</template>

<script>
import { toFriendlyUrl } from '@/app_library/url.js'
import StarRating from 'vue-star-rating'

export default {
  props: {
    recipe: {
      type: Object,
      required: true
    },
    showAdminEdit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ingredients () {
      let htmlItens = ''
      this.recipe.ingredients.split('\n').forEach(element => {
        htmlItens += `<p>${element}</p>`
      })
      return htmlItens
    },
    friendlyUrl () {
      return toFriendlyUrl(this.recipe.name)
    }
  },
  components: {
    StarRating
  }
}
</script>

<style scoped>
.md-card {
    width: 340px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
}
</style>
