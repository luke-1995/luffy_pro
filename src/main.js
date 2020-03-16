// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/global/global.css'
import '../static/plugins/bootstrap/css/bootstrap.css'
import '../static/plugins/font-awesome/css/font-awesome.css'
import '../static/css/nav.css'
import '../static/rbac/css/rbac.css'
import Vue2Editor from 'vue2-editor'

Vue.use(Vue2Editor)

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
