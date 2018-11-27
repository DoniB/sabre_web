<template>
  <dashboard-frame :title="title">
        <form novalidate class="md-layout" @submit.prevent>
            <md-card class="md-layout-item md-size-80 md-small-size-90 sign-card">
                <md-card-header>
                  <div class="md-title">{{ title }}</div>
                </md-card-header>
                <md-card-content>
                    <md-field>
                      <label>Foto</label>
                      <md-file placeholder="Foto (opcional)" :disabled="sending"/>
                    </md-field>
                    <md-field :class="getValidationClass('name')">
                        <label>Nome da receita</label>
                        <md-input v-model="form.name" required :disabled="sending || loading"></md-input>
                        <span class="md-error" v-if="!$v.form.name.required">É necessário informar o nome da receita</span>
                    </md-field>
                    <md-field :class="getValidationClass('ingredients')">
                        <label>Ingredientes</label>
                        <md-textarea v-model="form.ingredients" id="text-ingredients" required :disabled="sending || loading"></md-textarea>
                        <span class="md-error" v-if="!$v.form.ingredients.required">Ops, está faltando os ingredientes</span>
                    </md-field>
                    <md-field :class="getValidationClass('directions')">
                        <label>Modo de preparo</label>
                        <md-textarea v-model="form.directions" id="text-directions" required :disabled="sending || loading"></md-textarea>
                        <span class="md-error" v-if="!$v.form.directions.required">Ops, está faltando modo de preparo</span>
                    </md-field>
                    <div>
                      <md-radio v-model="form.status" :disabled="sending || loading" :value="0">Aguardando Ativação</md-radio>
                      <md-radio v-model="form.status" :disabled="sending || loading" :value="1">Ativo</md-radio>
                      <md-radio v-model="form.status" :disabled="sending || loading" :value="2">Pausado</md-radio>
                      <md-radio v-model="form.status" :disabled="sending || loading" :value="4">Rejeitado</md-radio>
                    </div>
                </md-card-content>
            <md-progress-bar md-mode="indeterminate" v-if="sending || loading" />
                <md-card-actions>
                    <md-button type="submit" class="md-primary" @click="validateRecipe" :disabled="sending || loading"> Enviar </md-button>
                </md-card-actions>
            </md-card>

            <md-snackbar :md-position="'center'" :md-duration="Infinity" :md-active.sync="showSnackbar" md-persistent>
                <span>{{ snackMessage }}</span>
                <md-button class="md-primary" @click="showSnackbar = false">Fechar</md-button>
            </md-snackbar>
        </form>
  </dashboard-frame>
</template>

<script>
import Frame from './Frame.vue'
import CenterContent from '@/components/shared/CenterContent.vue'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import router from '@/router'
const axios = require('axios')

export default {
  mixins: [validationMixin],
  data () {
    return {
      title: 'Receitas Para Liberar',
      loading: true,
      sending: false,
      showSnackbar: false,
      snackMessage: '',
      form: {}
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    validateRecipe () {
      console.log('todo: validateRecipe')
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sending = true
        this.updateRecipe()
      }
    },
    updateRecipe () {
      let token = this.$cookie.get('SecureToken')
      axios
        .patch('https://sabre-api.herokuapp.com/api/v1/users/recipe/' + this.$route.params.id, {
          name: this.form.name,
          ingredients: this.form.ingredients,
          directions: this.form.directions,
          status: this.form.status
        }, { headers: { 'X-Secure-Token': token } })
        .then(response => (this.recipeUpdated(response)))
        .catch(this.requestError)
    },
    recipeUpdated (response) {
      this.snackMessage = 'Receita atualizada.'
      this.showSnackbar = true
      console.log(response.data)
      setTimeout(function () {
        router.push('/usuario/receitas-para-liberar/')
      }, 5000)
    },
    requestError () {
      this.snackMessage = 'Ops, algo deu errado :( Por favor tente novamente mais tarde.'
      this.showSnackbar = true
    }
  },
  components: {
    dashboardFrame: Frame,
    centerContent: CenterContent
  },
  created () {
    let token = this.$cookie.get('SecureToken')
    axios
      .get('https://sabre-api.herokuapp.com/api/v1/users/recipe/' + this.$route.params.id, {
        headers: { 'X-Secure-Token': token } })
      .then((response) => {
        this.form = response.data
        this.loading = false
      })
      .catch((error) => { console.log(error) })
  },
  validations: {
    form: {
      name: {
        required
      },
      ingredients: {
        required
      },
      directions: {
        required
      }
    }
  }
}
</script>
