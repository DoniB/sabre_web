<template>
  <dashboard :title="title">
    <form novalidate class="md-layout" @submit.prevent>
      <md-card
        class="md-layout-item md-size-70 md-small-size-100 md-size-large-50"
      >
        <md-card-header> <h2 class="md-card-title">Novo</h2> </md-card-header>

        <md-card-content>
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
              <md-field :class="getValidationClass('password')">
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
      </md-card>

      <md-snackbar
        :md-position="'center'"
        :md-duration="Infinity"
        :md-active.sync="emailTaken"
        md-persistent
      >
        <span>Este email já está em uso</span>
        <md-button class="md-primary" @click="emailTaken = false"
          >Fechar</md-button
        >
      </md-snackbar>
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
      title: 'Cadastrar Novo Usuário',
      sending: false,
      emailTaken: false,
      user: {
        username: '',
        email: '',
        password: '',
        is_admin: false,
        active: true
      }
    }
  },
  methods: {
    validateUser() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sending = true
        this.createUser()
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
    createUser() {
      this.remote.adm.users.create(
        this.$cookie.get('SecureToken'),
        this.user,
        () => {
          this.$router.push({ name: 'dashboard.users' })
        },
        err => {
          if (err.data.errors.email[0] === 'has already been taken') {
            this.emailTaken = true
            this.sending = false
          }
        }
      )
    }
  },
  validations: {
    user: {
      username: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  components: {
    Dashboard
  }
}
</script>
