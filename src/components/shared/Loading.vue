<template>
  <center-content style="margin-top: 10%;">
      <md-progress-spinner :md-diameter="200" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
  </center-content>
</template>

<script>
import CenterContent from '@/components/shared/CenterContent.vue'

export default {
  components: {
    centerContent: CenterContent
  }
}
</script>
