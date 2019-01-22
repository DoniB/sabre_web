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
              :disabled="sending || loading"
            ></md-input>
            <span class="md-error" v-if="!$v.form.name.required"
              >É necessário informar o nome da receita</span
            >
          </md-field>
          <md-field :class="getValidationClass('ingredients')">
            <label>Ingredientes</label>
            <md-textarea
              v-model="form.ingredients"
              id="text-ingredients"
              required
              :disabled="sending || loading"
            ></md-textarea>
            <span class="md-error" v-if="!$v.form.ingredients.required"
              >Ops, está faltando os ingredientes</span
            >
          </md-field>
          <div>
            <label>Ingredientes (Relacionamento)</label>
            <md-field v-for="(ingredient, index) in ingredients" :key="index">
              <label v-if="ingredient.from && !ingredient.waiting"
                >Novo Ingrediente ({{ ingredient.from }})</label
              >
              <md-input
                v-model="ingredient.name"
                :disabled="sending || loading || ingredient.waiting"
                placeholder="Novo ingrediente"
                :class="{
                  'ingredient-exists': ingredient.id,
                  'ingredient-dont-exists': !ingredient.id
                }"
                @input="
                  delete ingredient.id
                  ingredient.from = 'Desconhecido'
                "
              ></md-input>
              <div @click="ingredients.splice(index, 1)">
                <md-icon>block</md-icon>
              </div>
            </md-field>
            <div class="add-ingredient" @click.stop="addIngredient">
              <md-icon>add_circle_outline</md-icon>
            </div>
          </div>
          <md-field :class="getValidationClass('directions')">
            <label>Modo de preparo</label>
            <md-textarea
              v-model="form.directions"
              id="text-directions"
              required
              :disabled="sending || loading"
            ></md-textarea>
            <span class="md-error" v-if="!$v.form.directions.required"
              >Ops, está faltando modo de preparo</span
            >
          </md-field>
          <div>
            <md-radio
              v-model="form.status"
              :disabled="sending || loading"
              :value="0"
              >Aguardando Ativação</md-radio
            >
            <md-radio
              v-model="form.status"
              :disabled="sending || loading"
              :value="1"
              >Ativo</md-radio
            >
            <md-radio
              v-model="form.status"
              :disabled="sending || loading"
              :value="2"
              >Pausado</md-radio
            >
            <md-radio
              v-model="form.status"
              :disabled="sending || loading"
              :value="4"
              >Rejeitado</md-radio
            >
          </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending || loading" />
        <md-card-actions>
          <md-button
            type="submit"
            class="md-primary"
            @click="validateRecipe"
            :disabled="sending || loading"
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
        <span>{{ snackMessage }}</span>
        <md-button class="md-primary" @click="showSnackbar = false"
          >Fechar</md-button
        >
      </md-snackbar>
    </form>
  </dashboard-frame>
</template>

<script>
import Frame from '@/components/dashboard/Frame.vue'
import CenterContent from '@/components/shared/CenterContent.vue'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import router from '@/router'

export default {
  mixins: [validationMixin],
  data() {
    return {
      title: 'Receita',
      loading: true,
      sending: false,
      showSnackbar: false,
      snackMessage: '',
      form: {},
      cover: null,
      ingredients: []
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    validateRecipe() {
      console.log('todo: validateRecipe')
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sending = true
        this.updateRecipe()
      }
    },
    updateRecipe() {
      const token = this.$cookie.get('SecureToken')
      const recipe = { ...this.form }
      recipe.cover = this.cover
      this.saveIngredients()
      recipe.ingredient_ids = this.ingredients.map(ingredient => ingredient.id)
      this.remote.users.recipe.update(
        token,
        recipe,
        this.recipeUpdated,
        this.requestError
      )
    },
    recipeUpdated(response) {
      this.snackMessage = 'Receita atualizada.'
      this.showSnackbar = true
      setTimeout(function() {
        router.push({
          name: 'dashboard.recipes'
        })
      }, 5000)
    },
    requestError() {
      this.snackMessage =
        'Ops, algo deu errado :( Por favor tente novamente mais tarde.'
      this.showSnackbar = true
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
        this.cover = reader.result
      }
      reader.onerror = error => {
        console.log('Error: ', error)
      }
    },
    addIngredient() {
      this.ingredients.push({ id: null, name: '' })
    },
    filterIngredient(ingredient) {
      let newName = ingredient.name.replace(/\(.*?\)/g, '')

      let needle = newName.indexOf('de')
      if (needle) {
        newName = newName.substring(needle + 3)
      }

      newName = newName.replace(/(^|\s)\S/g, l => l.toUpperCase())
      ingredient.name = newName.trim()
      return ingredient
    },
    async searchIngredient(ingredient) {
      const result = await this.remote.axios.get(
        `${this.remote.BASE_URL}/v1/ingredients?q=${ingredient.name}`
      )
      if (Array.isArray(result.data) && result.data.length > 0) {
        const first = result.data[0]
        if (ingredient.from.toLowerCase().includes(first.name.toLowerCase())) {
          ingredient.id = first.id
          ingredient.from = false
        }
      }
      ingredient.waiting = false
    },
    async saveIngredients() {
      const token = this.$cookie.get('SecureToken')
      for (const ingredient of this.ingredients) {
        if (!ingredient.id) {
          ingredient.waiting = true
          let result
          result = await this.remote.axios.post(
            `${this.remote.BASE_URL}/v1/ingredients`,
            { name: ingredient.name },
            { headers: { 'X-Secure-Token': token } }
          )
          ingredient.id = result.data.id
          ingredient.name = result.data.name
          ingredient.from = null
          ingredient.waiting = false
        }
      }
    }
  },
  components: {
    dashboardFrame: Frame,
    centerContent: CenterContent
  },
  created() {
    const token = this.$cookie.get('SecureToken')
    const recipeId = this.$route.params.id

    this.remote.users.recipe.show(
      token,
      recipeId,
      response => {
        this.form = response.data
        this.loading = false
        this.title = `Receita #${this.$route.params.id} - ${this.form.name}`

        this.remote.recipes.ingredients(
          recipeId,
          response => {
            let ingredients = response.data
            if (Array.isArray(ingredients) && ingredients.length > 0) {
              this.ingredients = response.data
            } else {
              ingredients = this.form.ingredients
                .split('\n')
                .map(e => ({ name: e, from: e, waiting: true }))
                .map(e => this.filterIngredient(e))
                .filter(e => e.name.length > 0)
              this.ingredients = ingredients
              ingredients.forEach(element => {
                this.searchIngredient(element)
              })
            }
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
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

.add-ingredient {
  text-align: right;
  padding-bottom: 15px;
}

.md-icon:hover {
  color: #2534ff;
}

.ingredient-exists {
  text-shadow: 2px 2px 2px rgba(5, 161, 73, 0.43);
}

.ingredient-dont-exists {
  text-shadow: 2px 2px 2px rgba(204, 0, 92, 0.4);
}
</style>
