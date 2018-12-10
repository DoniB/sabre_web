<template>
  <dashboard :title="title">
    <md-table v-model="users" md-card>

      <md-table-toolbar>
        <md-field md-clearable class="md-toolbar-section-start">
          <md-input placeholder="Procurar por nome" v-model="search" @keypress.enter="searchByName"></md-input>
        </md-field>
        <md-button @input="searchByName" class="md-icon-button"><md-icon>search</md-icon></md-button>
      </md-table-toolbar>

      <md-table-row @click="editUser(item)" slot="md-table-row" slot-scope="{ item }" :class="{inactive: !item.active}">
        <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nome">{{ item.username }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Cadastrado">{{ item.created_at | toLocalTime }}</md-table-cell>
        <md-table-cell md-label="Atualizado">{{ item.updated_at | toLocalTime }}</md-table-cell>
        <md-table-cell md-label="Adm">{{ item.is_admin ? 'Sim' : 'Não' }}</md-table-cell>
        <md-table-cell>
          <!-- <router-link class="action-button" :to="{name: 'dashboard.users.edit', params: {id: item.id}}"><md-icon>description</md-icon></router-link> -->
          <!-- <md-icon>pageview</md-icon> -->
          <div @click.stop="showUserActiveStateSwapDialog(item)">
            <md-icon>{{ item.active ? 'block' : 'add_circle_outline' }}</md-icon>
          </div>
        </md-table-cell>
      </md-table-row>

    </md-table>
    <paginate class="md-layout-item" @change="updatePage" :currentPage="currentPage" :totalPages="pages"></paginate>
    <div class="add-user">
      <md-button :to="{name: 'dashboard.users.new'}" class="md-fab md-primary">
          <md-icon>add</md-icon>
      </md-button>
    </div>
    <md-dialog :md-active.sync="showUserStateDialog">
      <md-dialog-title>Alterar usuário {{currentUserForChangeState.username}}?</md-dialog-title>
      <div class="dialog-content">
        <div v-if="currentUserForChangeState.active">Ao confirmar esta ação não será mais possivel efetuar login com esta conta</div>
        <div v-else>Ao confirmar esta ação esta conta estará apta a efetuar login novamente</div>
      </div>
      <md-dialog-actions>
        <md-button @click="updateUserActiveState" class="md-primary">{{ currentUserForChangeState.active ? 'Desativar' : 'Ativar'}}</md-button>
        <md-button @click="showUserStateDialog = false" class="md-primary">Cancelar</md-button>
      </md-dialog-actions>
    </md-dialog>
  </dashboard>
</template>

<script>
import Dashboard from '@/components/dashboard/Frame.vue'
import Paginate from '@/components/shared/Paginate.vue'

export default {
  data () {
    return {
      users: [],
      title: 'Usuários',
      search: '',
      showUserStateDialog: false,
      currentUserForChangeState: {},
      showSnackbar: false,
      currentPage: 0,
      pages: 0
    }
  },
  methods: {
    searchByName () {
      this.loadUsers()
    },
    loadUsers () {
      this.remote.adm.users.index(
        this.$cookie.get('SecureToken'),
        this.currentPage,
        this.search,
        this.usersLoaded
      )
    },
    usersLoaded (response) {
      this.pages = response.data.page.total
      this.users = response.data.users
    },
    updatePage (page) {
      this.currentPage = page
      this.loadUsers()
    },
    editUser (user) {
      this.$router.push({name: 'dashboard.users.edit', params: {id: user.id}})
    },
    showUserActiveStateSwapDialog (user) {
      this.currentUserForChangeState = user
      this.showUserStateDialog = true
    },
    updateUserActiveState () {
      const user = this.currentUserForChangeState
      const copy = {...user}
      copy.active = !(user.active)

      this.remote.adm.users.update(
        this.$cookie.get('SecureToken'),
        copy,
        () => {
          user.active = copy.active
        }
      )

      this.showUserStateDialog = false
    }
  },
  filters: {
    'toLocalTime' (payload) {
      const time = new Date(payload)
      return time.toLocaleString()
    }
  },
  components: {
    Dashboard,
    Paginate
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

.inactive {
  background-color: #B00020;
  color: #FFFFFF;
}

a.action-button {
  text-decoration: none;
}

div.dialog-content {
  padding: 25px;
}
</style>
