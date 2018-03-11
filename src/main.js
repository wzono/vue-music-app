import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// import fastclick from 'fastclick'
// import vueLazyLoad from 'vue-lazyload'
import flexsible from 'amfe-flexible'
import 'common/stylus/index.styl'

// fastclick.attach(document.body)
Vue.config.productionTip = false

Vue.use(flexsible)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
