<template>
  <dashboard :title="title">
    <md-table v-model="users" md-card md-fixed-header>

      <md-table-toolbar>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Procurar por nome" v-model="search" @keypress.enter="searchByName"></md-input>
          <md-button class="md-icon-button"><md-icon>search</md-icon></md-button>
        </md-field>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nome">{{ item.username }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Cadastrado">{{ item.created_at | toLocalTime }}</md-table-cell>
        <md-table-cell md-label="Atualizado">{{ item.updated_at | toLocalTime }}</md-table-cell>
        <md-table-cell md-label="Administrador">{{ item.is_admin ? 'Sim' : 'Não' }}</md-table-cell>
        <md-table-cell>
          <router-link :to="{name: 'dashboard.users.edit', params: {id: item.id}}"><md-icon>description</md-icon></router-link>
          <md-icon>pageview</md-icon>
          <md-icon>highlight_off</md-icon>
        </md-table-cell>
      </md-table-row>

    </md-table>
    <div class="add-user">
      <md-button :to="{name: 'dashboard.users.new'}" class="md-fab md-primary">
          <md-icon>add</md-icon>
      </md-button>
    </div>
  </dashboard>
</template>

<script>
import Dashboard from '@/components/dashboard/Frame.vue'
export default {
  data () {
    return {
      users: [],
      title: 'Usuários',
      search: '',
      currentPage: 0,
      pages: 0
    }
  },
  methods: {
    searchByName () {
      console.log(this.search)
    },
    loadUsers () {
      console.log('loadUsers')
      this.remote.adm.users.index(
        this.$cookie.get('SecureToken'),
        this.search,
        this.usersLoaded
      )
    },
    usersLoaded (response) {
      this.pages = response.data.page.total
      this.users = response.data.users
    }
  },
  filters: {
    'toLocalTime' (payload) {
      const time = new Date(payload)
      return time.toLocaleString()
    }
  },
  components: {
    Dashboard
  },
  created () {
    this.loadUsers()
  }
}
</script>

<style scoped>
.add-user {
  text-align: right;
}
</style>
