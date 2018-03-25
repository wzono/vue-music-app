import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('components/login/login')), 'login')
    },
    {
      path: '/:xh',
      component: r => require.ensure([], () => r(require('components/cards/cards')), 'cards')
    }
  ]
})
