<template>
  <div id="app" class="page-container">

    <md-toolbar class="md-medium">
      <router-link to="/"><h3 class="md-title">SABRE</h3></router-link>
      <md-button to="/"><md-icon>home</md-icon> Inicio</md-button>
      <div class="md-toolbar-section-end">
        <md-button class="md-default" to="/usuario/enviar-receita"><md-icon>restaurant_menu</md-icon> Enviar Receita </md-button>
        <a v-if="$store.state.isLogged" @click="logOut">Sair</a>
        <md-button v-else class="md-default" to="/sign"><md-icon>perm_identity</md-icon> Entrar</md-button>
      </div>
    </md-toolbar>

    <!-- <router-link to="/sign">Entrar</router-link> -->
    <div class="md-layout router-body">
      <div class="md-layout-item md-size-100">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import router from '@/router'
import store from './store'
const axios = require('axios')

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.isLogged) {
      next({
        path: '/sign',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default {
  name: 'App',
  methods: {
    ...mapActions(['unloadUser', 'loadUser']),
    logOut () {
      this.unloadUser()
      this.$cookie.delete('SecureToken')
    },
    doLogin (response) {
      this.loadUser(response.data)
      if (this.$route.name === 'sign') {
        router.push('/')
      }
    }
  },
  created () {
    let token = this.$cookie.get('SecureToken')
    if (token) {
      axios
        .get('https://sabre-api.herokuapp.com/api/v1/user', {
          headers: { 'X-Secure-Token': token }
        })
        .then(this.doLogin)
        .catch(this.logOut)
    } else {
      console.log('no secure token')
    }
  }
}
</script>

<style scoped>
  .router-body {
    margin-top: 5px;
  }
</style>
