<template>
  <dashboard-frame :title="title">
    <div>
      Recipes Waiting Activation Placeholder
    </div>
  </dashboard-frame>
</template>

<script>
import Frame from './Frame.vue'

export default {
  data () {
    return {
      title: 'Receitas Para Liberar'
    }
  },
  components: {
    dashboardFrame: Frame
  }
}
</script>
