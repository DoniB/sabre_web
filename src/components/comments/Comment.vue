<template>
  <div class="comment">
    <p><span class="comment-text">
      <span class="mutted">{{ comment.username || 'Usuário' }}
        <router-link v-if="isAdmin" tag="a" :to="{name: 'DashboardRecipesWaitingActivationEdit', params: {id: 1}}" class="edit-user-link">
          <md-icon>edit</md-icon>
        </router-link>
      </span>
        {{ comment.text }}
        <span class="mutted comment-time">{{ comment.created_at | timePassed }}</span>
        <router-link v-if="isAdmin" tag="a" :to="{name: 'DashboardRecipesWaitingActivationEdit', params: {id: 1}}" class="delete-comment-link">
          <md-icon>delete</md-icon>
        </router-link>
      </span></p>
  </div>
</template>

<script>
import DateMixin from '@/app_library/date.js'

export default {
  mixins: [
    DateMixin
  ],
  props: ['comment'],
  computed: {
    isAdmin () {
      return this.$store.state.isAdmin
    }
  }
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

.comment-time {
  font-size: .8em;
}

.mutted {
  color: #8f8f8f;
  font-style: italic;
}

a.edit-user-link .md-icon, a.delete-comment-link .md-icon {
  font-size: 1.2em !important;
  color: #8f8f8f !important;
}

a.edit-user-link:hover, a.delete-comment-link:hover {
  text-decoration: none;
}

</style>
