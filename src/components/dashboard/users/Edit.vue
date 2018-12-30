<template>
  <dashboard :title="title">
    <form novalidate class="md-layout" @submit.prevent>
      <md-card
        class="md-layout-item md-size-70 md-small-size-100 md-size-large-50"
      >
        <md-card-header> <h2 class="md-card-title">Editar</h2> </md-card-header>

        <md-card-content v-if="user.id">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
              <md-field :class="getValidationClass('username')">
                <label for="username">Nome: </label>
                <md-input
                  name="username"
                  autocomplete="name"
                  id="username"
                  v-model="user.username"
                  :disabled="sending"
                />
              </md-field>
            </div>
            <div class="md-layout-item md-size-100">
              <md-field :class="getValidationClass('email')">
                <label for="email">E-mail: </label>
                <md-input
                  type="email"
                  name="email"
                  autocomplete="email"
                  id="email"
                  v-model="user.email"
                  :disabled="sending"
                />
              </md-field>
            </div>
            <div class="md-layout-item md-size-100">
              <md-field>
                <label for="password">Senha: </label>
                <md-input
                  type="password"
                  name="password"
                  autocomplete="password"
                  id="password"
                  v-model="user.password"
                  :disabled="sending"
                />
              </md-field>
            </div>
            <div class="md-layout-item md-size-100">
              <br />
              <label>Administrador?</label>
              <div>
                <md-radio v-model="user.is_admin" :value="false">Não</md-radio>
                <md-radio v-model="user.is_admin" :value="true">Sim</md-radio>
              </div>
            </div>
            <div class="md-layout-item md-size-100">
              <br />
              <label>Ativo?</label>
              <div>
                <md-radio v-model="user.active" :value="false">Não</md-radio>
                <md-radio v-model="user.active" :value="true">Sim</md-radio>
              </div>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button
            @click="validateUser"
            type="submit"
            class="md-primary"
            :disabled="sending"
          >
            Salvar
          </md-button>
        </md-card-actions>

        <md-snackbar
          :md-position="'center'"
          :md-duration="Infinity"
          :md-active.sync="showSnackbar"
          md-persistent
        >
          <span>O registro foi atualizado</span>
          <md-button class="md-primary" @click="showSnackbar = false"
            >Fechar</md-button
          >
        </md-snackbar>
      </md-card>
    </form>
  </dashboard>
</template>

<script>
import Dashboard from '@/components/dashboard/Frame.vue'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data() {
    return {
      title: '',
      showSnackbar: false,
      sending: false,
      user: {}
    }
  },
  methods: {
    validateUser() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sending = true
        this.updateUser()
      }
    },
    getValidationClass(fieldName) {
      const field = this.$v.user[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    updateUser() {
      this.remote.adm.users.update(
        this.$cookie.get('SecureToken'),
        this.user,
        () => {
          this.showSnackbar = true
          this.sending = false
        }
      )
    }
  },
  created() {
    this.remote.adm.users.show(
      this.$cookie.get('SecureToken'),
      this.$route.params.id,
      ret => {
        this.user = ret.data
        this.title = `#${this.user.id} - ${this.user.username}`
      }
    )
  },
  validations: {
    user: {
      email: {
        required,
        email
      }
    }
  },
  components: {
    Dashboard
  }
}
</script>
