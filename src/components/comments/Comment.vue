<template>
  <div class="comment">
    <p><span class="comment-text"><span class="mutted">{{ comment.username || 'Usuário' }}</span> {{ comment.text }}</span></p>
  </div>
</template>

<script>
export default {
  props: ['comment']
}
</script>

<style scoped>
.comment {
  margin: 3px;
  padding: 3px;
}

.comment-text {
  background-color: white;
  padding: 10px;
  border-radius: 15px;
}

.mutted {
  color: #8f8f8f;
  font-style: italic;
}
</style>
