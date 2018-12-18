<template>
  <md-button @click="setFavorite" class="md-fab md-fab-top-right md-accent" :class="{'md-mini': mdMini}" :disabled="disableButton">
    <md-icon>{{ favorite ? 'favorite' : 'favorite_border' }}</md-icon>
  </md-button>
</template>

<script>
export default {
  props: {
    'recipeId': {
      required: true,
      type: Number
    },
    'mdMini': {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      favorite: false,
      disableButton: false
    }
  },
  methods: {
    setFavorite () {
      this.disableButton = true
      if (this.favorite) {
        this.remote.recipes.favorite.delete(
          this.recipeId,
          this.$store.state.secureToken,
          response => {
            this.favorite = response.data.favorite
            this.disableButton = false
          },
          error => console.log(error)
        )
      } else {
        this.remote.recipes.favorite.create(
          this.recipeId,
          this.$store.state.secureToken,
          response => {
            this.favorite = response.data.favorite
            this.disableButton = false
          },
          error => console.log(error)
        )
      }
    }
  },
  created () {
    this.remote.recipes.favorite.show(
      this.recipeId,
      this.$store.state.secureToken,
      response => {
        this.favorite = response.data.favorite
      },
      error => console.log(error)
    )
  }
}
</script>
