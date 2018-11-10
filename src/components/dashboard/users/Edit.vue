<template>
  <dashboard :title="title">
    <form novalidate class="md-layout" @submit.prevent>
      <md-card class="md-layout-item md-size-70 md-small-size-100 md-size-large-50">
        <md-card-header>
          <h2 class="md-card-title">Editar {{ user.username }}</h2>
        </md-card-header>

        <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-medium-size-100">
            <md-field :class="getValidationClass('username')">
              <label for="username">Nome: </label>
              <md-input name="username" autocomplete="name" id="username" v-model="user.username" :disabled="sending" />
            </md-field>
          </div>
          <div class="md-layout-item md-medium-size-100">
            <md-field :class="getValidationClass('email')">
              <label for="email">E-mail: </label>
              <md-input type="email" name="email" autocomplete="email" id="email" v-model="user.email" :disabled="sending" />
            </md-field>
          </div>
          <div class="md-layout-item md-medium-size-100">
            <md-field :class="getValidationClass('password')">
              <label for="password" >Senha: </label>
              <md-input type="password" name="password" autocomplete="password" id="password" v-model="user.password" :disabled="sending" />
            </md-field>
          </div>
          <div class="md-layout-item md-medium-size-100">
            <br>
            <label for="password">Administrador?</label>
            <div :class="getValidationClass('password_confirmation')">
              <md-radio v-model="user.is_admin" :value="false">Não</md-radio>
              <md-radio v-model="user.is_admin" :value="true">Sim</md-radio>
            </div>
          </div>
        </div>
      </md-card-content>

      <md-card-actions>
        <md-button type="submit" class="md-primary" :disabled="sending"> Atualizar </md-button>
      </md-card-actions>
      </md-card>
    </form>
  </dashboard>
</template>

<script>
import Dashboard from '@/components/dashboard/Frame.vue'
export default {
  data () {
    return {
      title: 'Una Altenwerth',
      sending: false,
      user: {
        id: 1,
        username: 'Una Altenwerth',
        email: 'jewel@bauch.name',
        created_at: '2018-10-20 17:35:56 UTC',
        updated_at: '2018-10-20 17:35:56 UTC',
        is_admin: true
      }
    }
  },
  methods: {
    getValidationClass (name) {
      return ''
    }
  },
  components: {
    Dashboard
  }
}
</script>
