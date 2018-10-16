// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie'

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
  MdList } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

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

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
