import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * Import modules
 */
import app_module from './modules/app/app_module'
import auth_module from './modules/auth/auth_module'
import todo_module from './modules/app/app_module'

export default new Vuex.Store({
  modules: {
    app: app_module,
    auth: auth_module,
    todo: todo_module
  }
})
