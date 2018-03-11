import Vue from 'vue'
import Router from 'vue-router'
import Cards from 'components/cards/cards'
import Login from 'components/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/:xh',
      component: Cards
    }
  ]
})
