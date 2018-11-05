<template>
  <div>
    <star-rating
      v-model="stars"
      :star-size="25"
      rounded-corners
      :show-rating="false"
      :padding="1"
      @rating-selected="ratingSelected"></star-rating>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import router from '@/router'

export default {
  props:
    ['recipeId'],
  data () {
    return {
      stars: 0
    }
  },
  methods: {
    ratingSelected (value) {
      if (this.isAuth()) {
        this.remote.recipes.rating.create(
          this.recipeId,
          value,
          this.$cookie.get('SecureToken'),
          this.loadUserRating,
          this.loadUserRatingError
        )
      } else {
        router.push({
          path: '/sign',
          query: { redirect: router.currentRoute.fullPath }
        })
      }
    },
    loadUserRating (response) {
      if (response.data) {
        this.stars = response.data.stars
      }
    },
    loadUserRatingError (data) {
      console.log(data)
    }
  },
  created () {
    if (this.isAuth()) {
      this.remote.recipes.rating.show(
        this.recipeId,
        this.$cookie.get('SecureToken'),
        this.loadUserRating,
        this.loadUserRatingError)
    }
  },
  components: {
    StarRating
  }
}
</script>
