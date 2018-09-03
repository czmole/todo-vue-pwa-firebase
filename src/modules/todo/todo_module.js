
import todo_action from './todo_action'
import todo_mutation from './todo_mutation'
import todo_state from './todo_state'
import todo_getter from './todo_getter'

export default {
  state: todo_state,
  mutations: todo_mutation,
  getters: todo_getter,
  actions: todo_action
}