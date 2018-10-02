<template>
  <div id="app" class="page-container">

    <md-toolbar class="md-medium">
       <h3 class="md-title">SABRE</h3>
       <md-button to="/"><md-icon>home</md-icon> Inicio</md-button>
       <div class="md-toolbar-section-end">
        <a v-if="$store.state.isLogged" @click="logOut">Sair</a>
        <md-button v-else class="md-default" to="sign"><md-icon>perm_identity</md-icon> Entrar</md-button>
       </div>
    </md-toolbar>

    <!-- <router-link to="/sign">Entrar</router-link> -->
    <div class="md-layout md-gutter router-body">
      <div class="md-layout-item md-size-100">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['unloadUser']),
    logOut () {
      this.unloadUser()
      this.$cookie.delete('SecureToken')
    }
  }
}
</script>

<style scoped>
  .router-body {
    margin-top: 5px;
  }
</style>
