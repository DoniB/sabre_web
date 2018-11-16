import axios from 'axios'

const BASE_URL = 'https://sabre-api.herokuapp.com/api/v1'

const API = {
  users: {
    recipe: {
      create (token, recipe, success, error) {
        axios
          .post(BASE_URL + '/users/recipe',
            recipe,
            { headers: { 'X-Secure-Token': token } })
          .then(response => (success(response)))
          .catch(err => {
            if (error) error(err)
          })
      }
    }
  },
  recipes: {
    index (params, success, error) {
      axios
        .get(BASE_URL + '/recipes', {
          params: params
        })
        .then(success)
        .catch(err => {
          if (error) error(err)
        })
    },
    comments: {
      create (token, recipe, text, success, error) {
        axios
          .post(BASE_URL + '/recipes/' + recipe + '/comments', {
            text: text
          }, { headers: { 'X-Secure-Token': token } })
          .then(response => (success(response)))
          .catch(err => {
            if (error) error(err)
          })
      },
      index (recipe, success, error) {
        axios
          .get(BASE_URL + '/recipes/' + recipe + '/comments')
          .then(response => (success(response)))
          .catch(err => {
            if (error) error(err)
          })
      }
    },
    rating: {
      show (recipe, token, success, error) {
        axios
          .get(BASE_URL + '/recipes/' + recipe + '/rating',
            { headers: { 'X-Secure-Token': token } })
          .then(response => (success(response)))
          .catch(err => {
            if (error) error(err)
          })
      },
      create (recipe, stars, token, success, error) {
        axios
          .post(BASE_URL + '/recipes/' + recipe + '/rating',
            { stars: stars },
            { headers: { 'X-Secure-Token': token } })
          .then(response => (success(response)))
          .catch(err => {
            if (error) error(err)
          })
      }
    }
  },
  categories: {
    index (success, error) {
      axios
        .get(BASE_URL + '/categories')
        .then(response => (success(response)))
        .catch(err => {
          if (error) error(err)
        })
    }
  },
  adm: {
    users: {
      index (token, query, success, error) {
        const qParams = query ? `?q={query}` : ''
        axios
          .get(BASE_URL + '/adm/users' + qParams,
            { headers: { 'X-Secure-Token': token } })
          .then(response => (success(response)))
          .catch(err => {
            if (error) error(err)
          })
      },
      show (token, id, success, error) {
        axios
          .get(BASE_URL + '/adm/users/' + id,
            { headers: { 'X-Secure-Token': token } })
          .then(response => (success(response)))
          .catch(err => {
            if (error) error(err)
          })
      },
      update (token, user, success, error) {
        const userParams = { username: user.username,
          email: user.email,
          is_admin: user.is_admin
        }

        if (user.password) {
          userParams['password'] = user.password
        }

        axios
          .patch(BASE_URL + '/adm/users/' + user.id,
            userParams,
            { headers: { 'X-Secure-Token': token } })
          .then(response => (success(response)))
          .catch(err => {
            if (error) error(err)
          })
      },
      create (token, user, success, error) {
        axios
          .post(BASE_URL + '/adm/users',
            user,
            { headers: { 'X-Secure-Token': token } })
          .then(response => (success(response)))
          .catch(err => {
            if (error) { error(err.response) }
          })
      }
    }
  }
}

const mixin = {
  computed: {
    remote () {
      return API
    }
  }
}

export default mixin
