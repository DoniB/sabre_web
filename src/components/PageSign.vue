<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent>
      <md-card
        class="md-layout-item md-size-50 md-xsmall-size-90 md-small-size-50 md-medium-size-40 md-large-size-35 md-xlarge-size-30 sign-card"
      >
        <md-card-header>
          <md-tabs md-alignment="centered">
            <md-tab
              @click="signup = false"
              id="signin"
              md-label="Entrar"
            ></md-tab>
            <md-tab
              @click="signup = true"
              id="signup"
              class="mutted"
              md-label="Cadastrar"
            ></md-tab>
          </md-tabs>
        </md-card-header>
        <sign-up v-if="signup" />
        <sign-in v-else />
      </md-card>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import SignUp from '@/components/SignUp.vue'
import SignIn from '@/components/SignIn.vue'

Vue.component('sign-up', SignUp)
Vue.component('sign-in', SignIn)

export default {
  name: 'sign',
  data() {
    return {
      signup: false
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
