<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateUser">
            <md-card class="md-layout-item md-size-50 md-small-size-50 sign-card">
                <md-card-header>
                  <md-tabs md-alignment="centered">
                    <md-tab @click="signup = false" id="signin" md-label="Entrar"></md-tab>
                    <md-tab @click="signup = true" id="signup" class="mutted" md-label="Cadastrar"></md-tab>
                  </md-tabs>
                </md-card-header>

                <md-card-content>
                  <div class="md-layout md-gutter">
                    <div v-if="signup" class="md-layout-item md-medium-size-100">
                      <md-field :class="getValidationClass('username')">
                        <label for="username">Nome: </label>
                        <md-input name="username" autocomplete="name" id="username" v-model="form.username" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.username.required">É necessário informar o nome</span>
                        <span class="md-error" v-else-if="!$v.form.username.minLength">É necessário informar o nome valido</span>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-medium-size-100">
                      <md-field :class="getValidationClass('email')">
                        <label for="email">E-mail: </label>
                        <md-input type="email" name="email" autocomplete="email" id="email" v-model="form.email" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.email.required">É necessário informar um e-mail</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">É necessário informar um e-mail valido</span>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-medium-size-100">
                      <md-field :class="getValidationClass('password')">
                        <label for="password" >Senha: </label>
                        <md-input type="password" name="password" autocomplete="password" id="password" v-model="form.password" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.password.required">É necessário informar uma senha</span>
                        <span class="md-error" v-else-if="!$v.form.password.minLength">A senha deve ter mais de 6 caracteres</span>
                      </md-field>
                    </div>
                    <div v-if="signup" class="md-layout-item md-medium-size-100">
                      <md-field  :class="getValidationClass('password_confirmation')">
                        <label for="password_confirmation">Confirme senha: </label>
                        <md-input type="password" name="password_confirmation" autocomplete="password_confirmation" id="password_confirmation" v-model="form.password_confirmation" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.password_confirmation.required">É necessário confirmar a senha</span>
                        <span class="md-error" v-else-if="!$v.form.password_confirmation.sameAs">As senhas não são iguais</span>
                      </md-field>
                    </div>
                  </div>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions>
                  <md-button type="submit" class="md-primary">{{ title }}</md-button>
                </md-card-actions>

            </md-card>
        </form>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength,
  sameAs
} from 'vuelidate/lib/validators'

export default {
  name: 'sign',
  mixins: [validationMixin],
  data () {
    return {
      signup: false,
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
    validateUser () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        // this.saveUser()
        // this.sending = !this.sending
        this.signup = !this.signup
        this.userCreated = !this.userCreated
      }
      return false
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
  computed: {
    title () {
      if (this.signup) return 'Cadastrar'
      return 'Entrar'
    }
  },
  validations () {
    if (this.signup) {
      return {
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
      }
    }
    return {
      form: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    }
  }
}
</script>

<style>
    .sign-card {
      top: 15px;
      position: relative;
      margin-left: auto;
      margin-right: auto;
    }
</style>
