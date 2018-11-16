<template>
  <div class="md-layout md-alignment-top-center">
    <div class="paginate-control">
      <md-button :disabled="!canReduce" class="md-icon-button" @click="changePage(-1)">
        <md-icon>arrow_left</md-icon>
      </md-button>
      <span class="paginate-control-value">{{ currentPage + 1 }}</span>
      <md-button :disabled="!canIncrease" class="md-icon-button" @click="changePage(1)">
        <md-icon>arrow_right</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'currentPage': {
      required: true,
      type: Number
    },
    'totalPages': {
      required: true,
      type: Number
    }
  },
  methods: {
    changePage (value) {
      this.$emit('change', this.currentPage + value)
    }
  },
  computed: {
    canReduce () {
      return this.currentPage > 0
    },
    canIncrease () {
      return this.currentPage < (this.totalPages - 1)
    }
  }
}
</script>

<style scoped>
.paginate-control {
  margin-top: 5px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px gray;
  padding: 5px;
}

.paginate-control .paginate-control-value {
  display: inline-block;
  margin-top: 8px;
}

</style>
