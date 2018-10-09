import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import VueCookie from 'vue-cookie'

import { MdButton,
  MdContent,
  MdTabs,
  MdToolbar,
  MdIcon,
  MdCard,
  MdField,
  MdProgress,
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
Vue.use(store)
Vue.use(router)

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)
