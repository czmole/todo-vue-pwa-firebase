
import auth_action from './auth_action'
import auth_mutation from './auth_mutation'
import auth_state from './auth_state'

export default {
  state: auth_state,
  mutations: auth_mutation,
  getters: {},
  actions: auth_action
}