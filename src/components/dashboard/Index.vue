<template>
    <dashboard-frame :title="title">
      <div id="dashboard-index">dashboard index placeholder</div>
    </dashboard-frame>
</template>

<script>
import Frame from './Frame.vue'

export default {
  data () {
    return {
      title: 'Minha Conta'
    }
  },
  components: {
    dashboardFrame: Frame
  }
}
</script>
