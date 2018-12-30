import * as types from './mutation-types'

export const loadUser = ({ commit }, data) => {
  commit(types.USERNAME, data.username)
  commit(types.EMAIL, data.email)
  commit(types.IS_LOGGED, true)
  commit(types.SECURE_TOKEN, data.token)
  commit(types.IS_ADMIN, data.is_admin)
}

export const unloadUser = ({ commit }) => {
  commit(types.USERNAME, '')
  commit(types.EMAIL, '')
  commit(types.IS_LOGGED, false)
  commit(types.SECURE_TOKEN, '')
  commit(types.IS_ADMIN, false)
}
