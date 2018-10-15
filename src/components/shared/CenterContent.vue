<template>
    <div class="center-content">
        <div
            class="content-to-center"
            :style="{width: computedWidth, height: computedHeight}"><slot></slot></div>
    </div>
</template>

<script>
export default {
  props: ['width', 'height'],
  computed: {
    computedWidth () {
      if (this.width)
        return this.width
      return '200px'
    },
    computedHeight () {
      if (this.height)
        return this.height
      return '200px'
    }
  }
}
</script>


<style scoped>
div.center-content {
    width: 100%;
    height: 100%;
}

div.center-content div.content-to-center {
    margin-top: 50%;
    margin: auto;
}
</style>