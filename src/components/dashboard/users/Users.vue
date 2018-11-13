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
      users: [
        {id: 1, username: 'Una Altenwerth', email: 'jewel@bauch.name', created_at: '2018-10-20 17:35:56 UTC', updated_at: '2018-10-20 17:35:56 UTC', is_admin: false},
        {id: 2, username: 'Willow Hyatt', email: 'capricecasper@wilkinson.biz', created_at: '2018-10-20 17:35:56 UTC', updated_at: '2018-10-20 17:35:56 UTC', is_admin: false},
        {id: 3, username: 'Glennie Zulauf', email: 'martinsimonis@schaden.biz', created_at: '2018-10-20 17:35:56 UTC', updated_at: '2018-10-20 17:35:56 UTC', is_admin: false},
        {id: 4, username: 'Brett Larkin', email: 'shauna@jaskolski.co', created_at: '2018-10-20 17:35:56 UTC', updated_at: '2018-10-20 17:35:56 UTC', is_admin: false},
        {id: 5, username: 'Morton Lesch', email: 'chantaycremin@wuckert.co', created_at: '2018-10-20 17:35:56 UTC', updated_at: '2018-10-20 17:35:56 UTC', is_admin: false},
        {id: 6, username: 'Vivan Yundt', email: 'kacy@nitzscheconn.io', created_at: '2018-10-20 17:35:56 UTC', updated_at: '2018-10-20 17:35:56 UTC', is_admin: false},
        {id: 7, username: 'Tera Ernser', email: 'eleni@douglas.biz', created_at: '2018-10-20 17:35:56 UTC', updated_at: '2018-10-20 17:35:56 UTC', is_admin: false},
        {id: 8, username: 'Caterina Reichel', email: 'graigrobel@daniel.info', created_at: '2018-10-20 17:35:56 UTC', updated_at: '2018-10-20 17:35:56 UTC', is_admin: false},
        {id: 9, username: 'Marylynn Legros', email: 'demarcus@reichertbarrows.name', created_at: '2018-10-20 17:35:56 UTC', updated_at: '2018-10-20 17:35:56 UTC', is_admin: false},
        {id: 10, username: 'Jermaine Murray', email: 'liberty@hayes.net', created_at: '2018-10-20 17:35:56 UTC', updated_at: '2018-10-20 17:35:56 UTC', is_admin: false}
      ],
      title: 'Usuários',
      search: ''
    }
  },
  methods: {
    searchByName () {
      console.log(this.search)
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
  }
}
</script>

<style scoped>
.add-user {
  text-align: right;
}
</style>
