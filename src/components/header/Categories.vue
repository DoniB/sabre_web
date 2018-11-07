<template>
  <div>
    <md-button
      v-for="category in categories"
      :key="'hcat' + category.id">
      {{ category.name }}
    </md-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: {}
    }
  },
  created () {
    this.remote.categories.index(
      (res) => {
        this.categories = res.data
      },
      (err) => console.log('error loading categories at header', err)
    )
  }
}
</script>

<style scoped>
  div {
    text-align: center;
  }
</style>
