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
      <div v-else>
        <md-card-header class="md-primary">
          <p><span class="mutted">Você comentou:</span> {{ text }}</p>
        </md-card-header>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  props: ['recipeId'],
  data () {
    return {
      text: '',
      sendClicked: false,
      disableSend: false,
      notCommented: true
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
      console.log('created', response)
    },
    commentErrorCreating (response) {
      this.disableSend = false
      console.log('error', response)
    }
  },
  computed: {
    invalidMessage () {
      return this.sendClicked && (!this.text || this.text.size > 10)
    }
  },
  created () {
    console.log(this.recipeId)
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
