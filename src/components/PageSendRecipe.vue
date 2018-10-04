<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent>
            <md-card class="md-layout-item md-size-50 md-small-size-90 sign-card">
                <md-card-header>
                  <div class="md-title">Cadastro de Receitas</div>
                </md-card-header>
                <md-card-content>
                    <md-field :class="getValidationClass('name')">
                        <label>Nome da receita</label>
                        <md-input v-model="form.name" required :disabled="sending"></md-input>
                        <span class="md-error" v-if="!$v.form.name.required">É necessário informar o nome da receita</span>
                    </md-field>
                    <md-field :class="getValidationClass('ingredients')">
                        <label>Ingredientes</label>
                        <md-textarea v-model="form.ingredients" id="text-ingredients" required :disabled="sending"></md-textarea>
                        <span class="md-error" v-if="!$v.form.ingredients.required">Ops, está faltando os ingredientes</span>
                    </md-field>
                    <md-field :class="getValidationClass('directions')">
                        <label>Modo de preparo</label>
                        <md-textarea v-model="form.directions" id="text-directions" required :disabled="sending"></md-textarea>
                        <span class="md-error" v-if="!$v.form.directions.required">Ops, está faltando modo de preparo</span>
                    </md-field>
                </md-card-content>
            <md-progress-bar md-mode="indeterminate" v-if="sending" />
                <md-card-actions>
                    <md-button type="submit" class="md-primary" @click="validateRecipe" :disabled="sending"> Enviar </md-button>
                </md-card-actions>
            </md-card>

            <md-snackbar :md-position="'center'" :md-duration="Infinity" :md-active.sync="showSnackbar" md-persistent>
                <span>Ops, algo deu errado :( Por favor tente novamente mais tarde.</span>
                <md-button class="md-primary" @click="showSnackbar = false">Fechar</md-button>
            </md-snackbar>

        </form>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'sendRecipe',
  mixins: [validationMixin],
  data () {
    return {
      showSnackbar: false,
      sending: false,
      form: {
        name: '',
        ingredients: '',
        directions: ''
      }
    }
  },
  methods: {
    validateRecipe () {
      console.log('todo: validateRecipe')
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sending = true
        // this.createUser()
      }
    },
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    }
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

<style scoped>
  #text-ingredients {
    height: 300px;
  }
  #text-directions {
    height: 300px;
  }
</style>
