import axios from 'axios'

const BASE_URL = 'https://sabre-api.herokuapp.com/api'

const API = {
  BASE_URL,
  axios,
  users: {
    recipe: {
      show(token, recipeId, success, error) {
        axios
          .get(`${BASE_URL}/v1/users/recipe/${recipeId}`, {
            headers: { 'X-Secure-Token': token }
          })
          .then(success)
          .catch(err => {
            if (error) error(err)
          })
      },
      create(token, recipe, success, error) {
        axios
          .post(BASE_URL + '/v1/users/recipe', recipe, {
            headers: { 'X-Secure-Token': token }
          })
          .then(response => success(response))
          .catch(err => {
            if (error) error(err)
          })
      },
      update(token, recipe, success, error) {
        const formData = {
          name: recipe.name,
          ingredients: recipe.ingredients,
          directions: recipe.directions,
          status: recipe.status
        }
        if (recipe.cover) {
          formData.cover = recipe.cover
        }
        if (recipe.ingredient_ids) {
          formData.ingredient_ids = recipe.ingredient_ids
        }
        axios
          .patch(`${BASE_URL}/v1/users/recipe/${recipe.id}`, formData, {
            headers: { 'X-Secure-Token': token }
          })
          .then(success)
          .catch(err => {
            if (error) error(err)
          })
      },
      index(token, params, success, error) {
        axios
          .get(BASE_URL + '/v1/users/recipe', {
            params: params,
            headers: { 'X-Secure-Token': token }
          })
          .then(success)
          .catch(err => {
            if (error) error(err)
          })
      }
    },
    favorites: {
      index(token, success, error) {
        axios
          .get(BASE_URL + '/v1/users/favorites', {
            headers: { 'X-Secure-Token': token }
          })
          .then(success)
          .catch(err => {
            if (error) error(err)
          })
      }
    }
  },
  recipes: {
    index(params, success, error) {
      axios
        .get(BASE_URL + '/v2/recipes', {
          params: params
        })
        .then(success)
        .catch(err => {
          if (error) error(err)
        })
    },
    comments: {
      create(token, recipe, text, success, error) {
        axios
          .post(
            BASE_URL + '/v1/recipes/' + recipe + '/comments',
            {
              text: text
            },
            { headers: { 'X-Secure-Token': token } }
          )
          .then(response => success(response))
          .catch(err => {
            if (error) error(err)
          })
      },
      index(recipe, success, error) {
        axios
          .get(BASE_URL + '/v1/recipes/' + recipe + '/comments')
          .then(response => success(response))
          .catch(err => {
            if (error) error(err)
          })
      },
      delete(token, comment, success, error) {
        axios
          .delete(
            BASE_URL +
              '/v1/recipes/' +
              comment.recipe_id +
              '/comments/' +
              comment.id,
            { headers: { 'X-Secure-Token': token } }
          )
          .then(response => success(response))
          .catch(err => {
            if (error) error(err)
          })
      }
    },
    rating: {
      show(recipe, token, success, error) {
        axios
          .get(BASE_URL + '/v1/recipes/' + recipe + '/rating', {
            headers: { 'X-Secure-Token': token }
          })
          .then(response => success(response))
          .catch(err => {
            if (error) error(err)
          })
      },
      create(recipe, stars, token, success, error) {
        axios
          .post(
            BASE_URL + '/v1/recipes/' + recipe + '/rating',
            { stars: stars },
            { headers: { 'X-Secure-Token': token } }
          )
          .then(response => success(response))
          .catch(err => {
            if (error) error(err)
          })
      }
    },
    favorite: {
      create(recipe, token, success, error) {
        axios
          .post(
            BASE_URL + '/v1/recipes/' + recipe + '/favorite',
            {},
            { headers: { 'X-Secure-Token': token } }
          )
          .then(response => success(response))
          .catch(err => {
            if (error) error(err)
          })
      },
      show(recipe, token, success, error) {
        axios
          .get(BASE_URL + '/v1/recipes/' + recipe + '/favorite', {
            headers: { 'X-Secure-Token': token }
          })
          .then(response => success(response))
          .catch(err => {
            if (error) error(err)
          })
      },
      delete(recipe, token, success, error) {
        axios
          .delete(BASE_URL + '/v1/recipes/' + recipe + '/favorite', {
            headers: { 'X-Secure-Token': token }
          })
          .then(response => success(response))
          .catch(err => {
            if (error) error(err)
          })
      }
    },
    ingredients(recipeId, success, error) {
      axios
        .get(`${BASE_URL}/v1/recipes/${recipeId}/ingredients`)
        .then(success)
        .catch(err => {
          if (error) error(err)
        })
    }
  },
  categories: {
    index(success, error) {
      axios
        .get(BASE_URL + '/v1/categories')
        .then(response => success(response))
        .catch(err => {
          if (error) error(err)
        })
    }
  },
  adm: {
    users: {
      index(token, page, query, success, error) {
        let qParams = '?page=' + page

        if (query) {
          qParams += '&q=' + query
        }

        axios
          .get(BASE_URL + '/v1/adm/users' + qParams, {
            headers: { 'X-Secure-Token': token }
          })
          .then(response => success(response))
          .catch(err => {
            if (error) error(err)
          })
      },
      show(token, id, success, error) {
        axios
          .get(BASE_URL + '/v1/adm/users/' + id, {
            headers: { 'X-Secure-Token': token }
          })
          .then(response => success(response))
          .catch(err => {
            if (error) error(err)
          })
      },
      update(token, user, success, error) {
        const userParams = {
          username: user.username,
          email: user.email,
          is_admin: user.is_admin,
          active: user.active
        }

        if (user.password) {
          userParams.password = user.password
        }

        axios
          .patch(BASE_URL + '/v1/adm/users/' + user.id, userParams, {
            headers: { 'X-Secure-Token': token }
          })
          .then(response => success(response))
          .catch(err => {
            if (error) error(err)
          })
      },
      create(token, user, success, error) {
        axios
          .post(BASE_URL + '/v1/adm/users', user, {
            headers: { 'X-Secure-Token': token }
          })
          .then(response => success(response))
          .catch(err => {
            if (error) {
              error(err.response)
            }
          })
      }
    }
  }
}

const mixin = {
  computed: {
    remote() {
      return API
    }
  }
}

export default mixin
