// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import VueMaterial from 'vue-material'
import App from './App'
import router from './router'
import store from './store'
import api from './app_library/api.js'
import auth from './app_library/auth'

import {
  MdApp,
  MdButton,
  MdContent,
  MdDrawer,
  MdTabs,
  MdToolbar,
  MdIcon,
  MdCard,
  MdField,
  MdProgress,
  MdRadio,
  MdSnackbar,
  MdMenu,
  MdList,
  MdDivider } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// import 'vue-material/dist/theme/default-dark.css'
// import 'vue-material/dist/theme/black-green-dark.css'
// import 'vue-material/dist/theme/black-green-light.css'

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdToolbar)
Vue.use(MdIcon)
Vue.use(MdCard)
Vue.use(MdField)
Vue.use(MdProgress)
Vue.use(MdSnackbar)
Vue.use(VueCookie)
Vue.use(MdMenu)
Vue.use(MdList)
Vue.use(MdApp)
Vue.use(MdDrawer)
Vue.use(MdRadio)
Vue.use(MdDivider)
Vue.use(VueMaterial)

Vue.mixin(api)
Vue.mixin(auth)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
