<template>
    <div>
      <md-card-content>
        <div class="md-layout md-gutter">
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
        </div>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="sending" />

      <md-card-actions>
        <md-button type="submit" class="md-primary" @click="validateUser"> Entrar </md-button>
      </md-card-actions>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  email
} from 'vuelidate/lib/validators'

export default {
  name: 'sign-in',
  mixins: [validationMixin],
  data () {
    return {
      form: {
        email: '',
        password: ''
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
      email: {
        required,
        email
      },
      password: {
        required
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
