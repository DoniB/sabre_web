<template>
  <dashboard title="Enviar receita">
    <md-card
      v-if="showRecipeCreated"
      class="md-layout-item md-size-50 md-small-size-90 center-vertically center-horizontally"
    >
      <md-card-header>
        <div class="md-title center-align">
          Sua receita foi enviada. <br />
          Obrigado!
        </div>
      </md-card-header>
    </md-card>
    <form v-else novalidate class="md-layout" @submit.prevent>
      <md-card
        class="md-layout-item md-size-80 md-small-size-90 md-xlarge-size-60 sign-card"
      >
        <md-card-header>
          <div class="md-title">Cadastro de Receitas</div>
        </md-card-header>
        <md-card-content>
          <md-field>
            <label>Foto</label>
            <md-file
              placeholder="Foto (opcional)"
              :disabled="sending"
              accept="image/x-png,image/jpeg"
              @change="fileChange($event.target)"
            />
          </md-field>
          <md-field :class="getValidationClass('name')">
            <label>Nome da receita</label>
            <md-input
              v-model="form.name"
              required
              :disabled="sending"
            ></md-input>
            <span class="md-error" v-if="!$v.form.name.required"
              >É necessário informar o nome da receita</span
            >
          </md-field>
          <md-field :class="getValidationClass('category_id')">
            <md-select
              v-model="form.category_id"
              name="category"
              id="category"
              placeholder="Categoria"
            >
              <md-option
                v-for="category in categories"
                :key="'cat' + category.id"
                :value="category.id"
              >
                {{ category.name }}</md-option
              >
            </md-select>
            <span class="md-error" v-if="!$v.form.category_id.required"
              >Ops, está faltando a categoria</span
            >
          </md-field>
          <md-field :class="getValidationClass('ingredients')">
            <label>Ingredientes</label>
            <md-textarea
              v-model="form.ingredients"
              id="text-ingredients"
              required
              :disabled="sending"
            ></md-textarea>
            <span class="md-error" v-if="!$v.form.ingredients.required"
              >Ops, está faltando os ingredientes</span
            >
          </md-field>
          <md-field :class="getValidationClass('directions')">
            <label>Modo de preparo</label>
            <md-textarea
              v-model="form.directions"
              id="text-directions"
              required
              :disabled="sending"
            ></md-textarea>
            <span class="md-error" v-if="!$v.form.directions.required"
              >Ops, está faltando modo de preparo</span
            >
          </md-field>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <md-card-actions>
          <md-button
            type="submit"
            class="md-primary"
            @click="validateRecipe"
            :disabled="sending"
          >
            Enviar
          </md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar
        :md-position="'center'"
        :md-duration="Infinity"
        :md-active.sync="showSnackbar"
        md-persistent
      >
        <span
          >Ops, algo deu errado :( Por favor tente novamente mais tarde.</span
        >
        <md-button class="md-primary" @click="showSnackbar = false"
          >Fechar</md-button
        >
      </md-snackbar>
    </form>
  </dashboard>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import Frame from './Frame'

export default {
  name: 'sendRecipe',
  mixins: [validationMixin],
  data() {
    return {
      showSnackbar: false,
      sending: false,
      showRecipeCreated: false,
      categories: {},
      form: {
        name: '',
        ingredients: '',
        directions: '',
        category_id: null,
        cover: null
      }
    }
  },
  methods: {
    validateRecipe() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sending = true
        this.createRecipe()
      }
    },
    createRecipe() {
      let token = this.$cookie.get('SecureToken')
      this.remote.users.recipe.create(
        token,
        this.form,
        this.recipeCreated,
        this.requestError
      )
    },
    recipeCreated(response) {
      this.showRecipeCreated = true
    },
    requestError() {
      this.sending = false
      this.showSnackbar = true
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    loadCategories(response) {
      this.categories = response.data
    },
    fileChange(input) {
      this.sending = true
      this.getBase64(input.files[0])
    },
    getBase64(file) {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.sending = false
        this.form.cover = reader.result
      }
      reader.onerror = error => {
        console.log('Error: ', error)
      }
    }
  },
  components: {
    dashboard: Frame
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
      },
      category_id: {
        required
      }
    }
  },
  created() {
    this.remote.categories.index(this.loadCategories, res =>
      console.log('error loading categories', res)
    )
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
