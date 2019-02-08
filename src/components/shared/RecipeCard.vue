<template>
  <md-card>
    <favorite-button
      :recipeId="recipe.id"
      :mdMini="true"
      class="favorite-button"
    ></favorite-button>
    <md-card-media class="recipe-card-media">
      <img
        :class="{ 'fit-height': fitHeight, 'fit-width': !fitHeight }"
        @load="checkImageSize"
        :src="cover"
        alt="Receita"
        :ref="`rcp-img-${recipe.id}`"
      />
    </md-card-media>
    <md-card-header :id="`card-recipe-id-${recipe.id}`">
      <div class="md-title">{{ recipe.name }}</div>
      <div class="md-subhead">{{ recipe.owner }}</div>
      <div class="md-subhead recipe-date">
        {{ recipe.created_at | timePassed }}
      </div>
      <div class="md-layout md-alignment-top-right">
        <star-rating
          :rating="recipe.average_stars"
          :star-size="20"
          rounded-corners
          :show-rating="false"
          :padding="1"
          read-only
        >
        </star-rating>
      </div>
    </md-card-header>

    <md-card-expand>
      <md-card-actions md-alignment="space-between">
        <div>
          <md-button
            v-if="recipe.status === 1"
            :to="{
              name: 'recipe.show',
              params: { id: recipe.id, friendlyUrl: friendlyUrl }
            }"
            >Receita</md-button
          >
          <md-button
            v-if="showAdminEdit"
            :to="{ name: 'dashboard.recipes.edit', params: { id: recipe.id } }"
            >Editar</md-button
          >
        </div>

        <md-card-expand-trigger @click="showRecipe = !showRecipe">
          <md-button v-scroll-to="`#card-recipe-id-${recipe.id}`"
            >Ingredientes</md-button
          >
        </md-card-expand-trigger>
      </md-card-actions>

      <md-card-expand-content>
        <md-card-content v-html="ingredients"> </md-card-content>
      </md-card-expand-content>
    </md-card-expand>
  </md-card>
</template>

<script>
import { toFriendlyUrl } from '@/app_library/url.js'
import StarRating from 'vue-star-rating'
import FavoriteButton from '@/components/shared/FavoriteButton.vue'
import DateMixin from '@/app_library/date.js'

export default {
  mixins: [DateMixin],
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
  methods: {
    checkImageSize() {
      if (this.$refs[`rcp-img-${this.recipe.id}`].height !== 270) {
        this.fitHeight = true
      }
    }
  },
  data() {
    return {
      fitHeight: false
    }
  },
  computed: {
    ingredients() {
      let htmlItens = ''
      this.recipe.ingredients.split('\n').forEach(element => {
        htmlItens += `<p>${element}</p>`
      })
      return htmlItens
    },
    friendlyUrl() {
      return toFriendlyUrl(this.recipe.name)
    },
    cover() {
      return this.recipe.cover || '/static/img/demo.jpg'
    }
  },
  components: {
    StarRating,
    FavoriteButton
  }
}
</script>

<style scoped>
.md-card {
  width: 360px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}

.md-card-media {
  height: 270px;
  width: 360px;
}
.recipe-date {
  text-align: right;
}

.favorite-button {
  top: 5px;
  right: 5px;
}

.recipe-card-media {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  overflow: hidden;
}

.fit-height {
  height: 100%;
  width: auto;
  max-width: 1000px;
}

.fit-width {
  width: 100%;
  height: auto;
  max-height: 1000px;
}
</style>
