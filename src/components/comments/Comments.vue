<template>
  <md-card md-theme="comment-card" class="md-primary">
    <md-card-content>
      <div v-if="notCommented">
        <md-card-header class="md-transparent">
          <h3 class="md-title">Comentários</h3>
        </md-card-header>
        <br>
        <md-field :class="{'md-invalid': invalidMessage}">
          <label>Seu comentário</label>
          <md-textarea v-model="text" required md-autogrow></md-textarea>
          <span class="md-helper-text">Deixe sua opinião sobre esta receita</span>
          <span class="md-error">A mensagem deve ter no mínimo 10 caracteres</span>
        </md-field>
        <div class="pull-rigth">
          <md-button @click="sendComment" :disabled="disableSend">Comentar</md-button>
        </div>
      </div>
      <md-divider></md-divider>
      <comment v-for="c in comments" :comment="c" :key="'com' + c.id"></comment>
    </md-card-content>
  </md-card>
</template>

<script>
import Comment from './Comment.vue'

export default {
  props: ['recipeId'],
  data () {
    return {
      text: '',
      sendClicked: false,
      disableSend: false,
      notCommented: true,
      comments: []
    }
  },
  methods: {
    sendComment () {
      this.sendClicked = true
      if (this.invalidMessage) return
      this.disableSend = true
      const token = this.$cookie.get('SecureToken')
      this.api.recipes.comments.create(
        token, this.recipeId, this.text, this.commentCreated, this.commentErrorCreating
      )
    },
    commentCreated (response) {
      this.notCommented = false
      this.text = response.data.text
      this.comments.push(response.data)
      window.scrollTo(0, document.body.scrollHeight)
    },
    commentErrorCreating (response) {
      this.disableSend = false
      console.log('error', response)
    }
  },
  computed: {
    invalidMessage () {
      return this.sendClicked && this.text.length < 10
    }
  },
  created () {
    this.api.recipes.comments.index(this.recipeId, response => {
      this.comments = response.data
    })
  },
  components: {
    Comment
  }
}
</script>

<style lang="scss" scoped>
.pull-rigth {
  text-align: right;
}

.mutted {
  color: #8f8f8f
}

@import "~vue-material/dist/theme/engine";

@include md-register-theme("comment-card", (
  primary: #f9f9f9
));

@import "~vue-material/dist/theme/all";

</style>
