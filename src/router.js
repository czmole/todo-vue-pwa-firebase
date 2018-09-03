import Vue from 'vue'
import Router from 'vue-router'
import Store from './store'

import Auth from '../src/views/auth.vue'
import Todos from '../src/views/todo.vue'


Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: redirectRoot
    }, {
      path: '/auth',
      component: Auth,
      beforeEnter: guardAuth
    }, {
      path: '/todo',
      component: Todos,
      beforeEnter: guardTodo
    }
  ]
})

export const redirectRoot = () => {
  /**
   * If authenticate redirect to /todo
   */
  if (Store.state.auth.user != null) {
    return '/todo'
  }

  /**
   * If not authenticate reidirect to /auth
   */
  else {
    return '/auth'
  }
}

export const guardTodo = (to, from, next) => {
  /**
   * If not authenticate redirect to /auth
   */
  if (Store.state.auth.user === null) {
    next('/auth')
  }

  /**
   * Else just next
   */
  else next()
}

export const guardAuth = (to, from, next) => {
  /**
   * If authenticate redirect to /todo
   */
  if (Store.state.auth.user !== null) {
    next('/todo')
  }

  /**
   * Else just next
   */
  else next()
}