<template>
    <md-card>
        <md-card-media>
            <img src="/static/img/demo.jpg" alt="Demo">
        </md-card-media>
        <md-card-header>
            <div class="md-title">{{ recipe.name }}</div>
            <div class="md-subhead">{{ recipe.owner }}</div>
        </md-card-header>

        <md-card-expand>
            <md-card-actions md-alignment="space-between">
                <div>
                    <md-button>Receita</md-button>
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
export default {
  props: [ 'recipe' ],
  computed: {
    ingredients () {
      let htmlItens = ''
      this.recipe.ingredients.split('\n').forEach(element => {
        htmlItens += `<p>${element}</p>`
      })
      return htmlItens
    }
  }
}
</script>

<style scoped>
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
}
</style>
