<template>
  <div>
    <md-button
      v-for="category in categories"
      :key="'hcat' + category.id"
      :to="{
        name: 'category',
        params: {
          id: category.id,
          friendlyUrl: friendlyUrl(category.name)
        }
      }"
    >
      {{ category.name }}
    </md-button>
  </div>
</template>

<script>
import { toFriendlyUrl } from '@/app_library/url.js'

export default {
  data() {
    return {
      categories: {}
    }
  },
  methods: {
    friendlyUrl(name) {
      return toFriendlyUrl(name)
    }
  },
  created() {
    this.remote.categories.index(
      res => {
        this.categories = res.data.slice(0, 12)
      },
      err => console.log('error loading categories at header', err)
    )
  }
}
</script>

<style scoped>
div {
  text-align: center;
}
</style>
