<template>
  <div id="app" class="page-container">

    <md-toolbar class="md-medium">
       <h3 class="md-title">SABRE</h3>
       <md-button to="/"><md-icon>home</md-icon> Inicio</md-button>
       <div class="md-toolbar-section-end">
        <md-button class="md-default" to="sign"><md-icon>perm_identity</md-icon> Entrar</md-button>
       </div>
    </md-toolbar>

    <!-- <router-link to="/sign">Entrar</router-link> -->

    <router-view></router-view>

  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>
