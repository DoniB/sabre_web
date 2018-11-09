<template>
    <div>
        <md-app>
            <md-app-toolbar class="md-primary">
                <span class="md-title">{{ frameTitle }}</span>
            </md-app-toolbar>
            <md-app-drawer md-permanent="card">
                <md-list>

                    <md-list-item :to="{name: 'dashboardIndex'}">
                        <md-icon>note</md-icon>
                        <span class="md-list-item-text">Inicio</span>
                    </md-list-item>

                    <md-list-item to="/">
                        <md-icon>favorite</md-icon>
                        <span class="md-list-item-text">Favoritos</span>
                    </md-list-item>

                    <md-list-item :to="{name: 'dashboardRecipesWaitingActivation'}" v-if="isAdmin">
                        <md-icon>receipt</md-icon>
                        <span class="md-list-item-text">Receitas</span>
                    </md-list-item>

                    <md-list-item to="/" v-else>
                        <md-icon>receipt</md-icon>
                        <span class="md-list-item-text">Minhas Receitas</span>
                    </md-list-item>

                    <md-list-item :to="{name: 'dashboard.users'}" v-if="isAdmin">
                        <md-icon>people</md-icon>
                        <span class="md-list-item-text">Usuários</span>
                    </md-list-item>

                </md-list>
            </md-app-drawer>

            <md-app-content>
                <slot></slot>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
export default {
  props: ['title'],
  computed: {
    frameTitle () {
      if (this.title) {
        return this.title
      }
      return 'Dashboard'
    },
    isAdmin () {
      return this.$store.state.isAdmin
    }
  }
}
</script>

<style scoped>
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>
