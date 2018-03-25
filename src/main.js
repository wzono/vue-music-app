import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// import fastclick from 'fastclick'
// import vueLazyLoad from 'vue-lazyload'
import flexsible from 'amfe-flexible'
import 'common/stylus/index.styl'
import 'common/js/view'

// fastclick.attach(document.body)
Vue.config.productionTip = false
// 全局总线
Vue.prototype.$bus = new Vue()
Vue.use(flexsible)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
