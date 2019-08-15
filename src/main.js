import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios=axios
Vue.use(elementUi)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
