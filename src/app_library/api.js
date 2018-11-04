import axios from 'axios'

const BASE_URL = 'https://sabre-api.herokuapp.com/api/v1'

const API = {
  recipes: {
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
