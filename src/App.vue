<template>
  <div id="app" class="page-container">

    <md-toolbar class="md-medium">
      <div class="md-toolbar-section-start">
        <router-link to="/"><h3 class="md-title">SABRE</h3></router-link>
        <md-button to="/"><md-icon>home</md-icon> Inicio</md-button>
      </div>
      <div id="search">
        <md-field>
          <label>Nome ou ingrediente</label>
          <md-input v-model="query" @keypress.enter="search" placeholder="Procurar receitas" class="md-default"></md-input>
          <md-button @click="search" class="md-icon-button"><md-icon>search</md-icon></md-button>
        </md-field>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-default" to="/usuario/enviar-receita"><md-icon>restaurant_menu</md-icon> Enviar Receita </md-button>
        <md-menu md-align-trigger v-if="$store.state.isLogged">
          <md-button class="md-default" md-menu-trigger><md-icon>perm_identity</md-icon> {{ firstname }}</md-button>
          <md-menu-content>
            <md-menu-item  to="/usuario" class="menu-link">Minha Conta</md-menu-item>
            <md-menu-item  @click="logOut">Sair</md-menu-item>
          </md-menu-content>
        </md-menu>
        <md-button v-else class="md-default" to="/sign"><md-icon>perm_identity</md-icon> Entrar</md-button>
      </div>
    </md-toolbar>
    <md-toolbar class="md-primary md-medium">
      <categories></categories>
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
import Categories from '@/components/header/Categories.vue'
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
  data () {
    return {
      query: ''
    }
  },
  methods: {
    ...mapActions(['unloadUser', 'loadUser']),
    logOut () {
      this.unloadUser()
      this.$cookie.delete('SecureToken')
      if (router.currentRoute.meta.requiresAuth) {
        router.push(
          {
            path: '/sign',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    },
    doLogin (response) {
      this.loadUser(response.data)
      if (this.$route.name === 'sign') {
        let redirect = this.$route.query.redirect
        if (redirect) {
          router.push(redirect)
        } else {
          router.push('/')
        }
      }
    },
    search () {
      router.push({
        name: 'index',
        query: {
          q: this.query
        }
      })
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
    this.query = this.$route.query.q
  },
  computed: {
    firstname () {
      return this.$store.state.username.split(' ')[0]
    }
  },
  components: {
    Categories
  },
  watch: {
    '$route' (to, from) {
      if (to.query.q !== from.query.q) {
        this.query = this.$route.query.q
      }
    }
  }
}
</script>

<style scoped>
  .router-body {
    margin-top: 5px;
  }

  #search {
    max-width: 500px;
    min-width: 300px;
  }
</style>
