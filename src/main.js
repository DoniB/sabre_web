// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { MdButton,
  MdContent,
  MdTabs,
  MdToolbar,
  MdIcon,
  MdCard,
  MdField,
  MdProgress,
  MdSnackbar } from 'vue-material/dist/components'
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

Vue.config.productionTip = false

// const axios = require('axios');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
