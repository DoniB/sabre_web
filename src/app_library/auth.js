const AUTH = {
  methods: {
    isAuth () {
      return !!this.$cookie.get('SecureToken')
    }
  }
}

export default AUTH
