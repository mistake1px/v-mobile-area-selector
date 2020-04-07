import Vue from 'vue'
import App from './App.vue'
import AreaSelector from '../packages/index'

Vue.config.productionTip = false

Vue.use(AreaSelector)

new Vue({
  render: h => h(App),
}).$mount('#app')
