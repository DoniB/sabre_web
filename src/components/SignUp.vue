<template>
  <div>
    <md-card-content>
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-medium-size-100">
          <md-field :class="getValidationClass('username')">
            <label for="username">Nome: </label>
            <md-input
              name="username"
              autocomplete="name"
              id="username"
              v-model="form.username"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.username.required"
              >É necessário informar o nome</span
            >
            <span class="md-error" v-else-if="!$v.form.username.minLength"
              >É necessário informar o nome valido</span
            >
          </md-field>
        </div>
        <div class="md-layout-item md-medium-size-100">
          <md-field :class="getValidationClass('email')">
            <label for="email">E-mail: </label>
            <md-input
              type="email"
              name="email"
              autocomplete="email"
              id="email"
              v-model="form.email"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.email.required"
              >É necessário informar um e-mail</span
            >
            <span class="md-error" v-else-if="!$v.form.email.email"
              >É necessário informar um e-mail valido</span
            >
          </md-field>
        </div>
        <div class="md-layout-item md-medium-size-100">
          <md-field :class="getValidationClass('password')">
            <label for="password">Senha: </label>
            <md-input
              type="password"
              name="password"
              autocomplete="password"
              id="password"
              v-model="form.password"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.password.required"
              >É necessário informar uma senha</span
            >
            <span class="md-error" v-else-if="!$v.form.password.minLength"
              >A senha deve ter mais de 6 caracteres</span
            >
          </md-field>
        </div>
        <div class="md-layout-item md-medium-size-100">
          <md-field :class="getValidationClass('password_confirmation')">
            <label for="password_confirmation">Confirme senha: </label>
            <md-input
              type="password"
              name="password_confirmation"
              autocomplete="password_confirmation"
              id="password_confirmation"
              v-model="form.password_confirmation"
              :disabled="sending"
            />
            <span
              class="md-error"
              v-if="!$v.form.password_confirmation.required"
              >É necessário confirmar a senha</span
            >
            <span
              class="md-error"
              v-else-if="!$v.form.password_confirmation.sameAs"
              >As senhas não são iguais</span
            >
          </md-field>
        </div>
      </div>
    </md-card-content>

    <md-progress-bar md-mode="indeterminate" v-if="sending" />

    <md-card-actions>
      <md-button
        type="submit"
        class="md-primary"
        @click="validateUser"
        :disabled="sending"
      >
        Cadastrar
      </md-button>
    </md-card-actions>

    <md-snackbar
      :md-position="'center'"
      :md-duration="Infinity"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>Ops, algo deu errado :( Por favor tente novamente mais tarde.</span>
      <md-button class="md-primary" @click="showSnackbar = false"
        >Fechar</md-button
      >
    </md-snackbar>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { BASE_URL } from '@/app_library/api'
import router from '@/router'

const axios = require('axios')

export default {
  name: 'sign-up',
  mixins: [validationMixin],
  data() {
    return {
      showSnackbar: false,
      form: {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      sending: false
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
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    createUser() {
      axios
        .post(`${BASE_URL}/v1/user`, {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation
        })
        .then(response => this.userCreated(response))
        .catch(this.requestError)
    },
    userCreated(response) {
      this.loadUser(response.data)
      this.$cookie.set('SecureToken', response.data.token, 30)
      let redirect = this.$route.query.redirect
      if (redirect) {
        router.push(redirect)
      } else {
        router.push('/')
      }
    },
    requestError() {
      this.sending = false
      this.showSnackbar = true
    },
    ...mapActions(['loadUser'])
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      password_confirmation: {
        required,
        sameAs: sameAs('password')
      }
    }
  },
  created() {
    if (this.$store.state.isLogged) {
      router.push('/')
    }
  }
}
</script>

<style>
.sign-card {
  margin-left: auto;
  margin-right: auto;
}
</style>
