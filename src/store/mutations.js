import * as types from './mutation-types'

export const mutations = {
  [types.USERNAME] (state, username) {
    state.username = username
  },

  [types.EMAIL] (state, email) {
    state.email = email
  },

  [types.IS_LOGGED] (state, isLogged) {
    state.isLogged = isLogged
  },

  [types.SECURE_TOKEN] (state, secureToken) {
    state.secureToken = secureToken
  },

  [types.IS_ADMIN] (state, isAdmin) {
    state.isAdmin = isAdmin
  }
}
