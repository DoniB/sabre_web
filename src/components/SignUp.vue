<template>
    <div>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-medium-size-100">
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
          <div class="md-layout-item md-medium-size-100">
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
        <md-button type="submit" class="md-primary" @click="validateUser"> Cadastrar </md-button>
      </md-card-actions>
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
  name: 'sign-up',
  mixins: [validationMixin],
  data () {
    return {
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
  }
}
</script>

<style>
    .sign-card {
      margin-left: auto;
      margin-right: auto;
    }
</style>
