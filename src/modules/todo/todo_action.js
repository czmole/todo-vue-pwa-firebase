export const todoOnAdded = 'todoOnAdded'
export const todoOnRemoved = 'todoOnRemoved'
export const todoOnUpdated = 'todoOnUpdated'
export const watchTodo = 'watchTodo'

import {
  addSyncTodo,
  removeSyncTodo,
  updateSyncTodo,
  disableIgnoreFirstTodoAdded,
  enableIgnoreFirstTodoAdded
} from './todo_mutation'

export default {
  [watchTodo] (store) {
    if (store.todo.syncTodos.length > 0) {
      store.commit(enableIgnoreFirstTodoAdded)      
    } else {
      store.commit(disableIgnoreFirstTodoAdded)    
    }
  },

  [todoOnAdded](store, addedTodo, removePendingAddUnsyncTodo) {
    if (store.state.todo) {
      /**
       * Remove todo on onsync if have
       */
      removePendingAddUnsyncTodo(addedTodo)

      /**
       * Commit add sync todo
       */
      store.commit(addSyncTodo, addedTodo)
    } else {
      store.commit(disableIgnoreFirstTodoAdded)
    }
  },

  [todoOnRemoved](store, addedTodo, removePendingRemoveSyncTodo) {
    /**
     * Remove todo on onsync if have
     */
    removePendingRemoveSyncTodo(addedTodo)

    /**
     * Commit add sync todo
     */
    store.commit(removeSyncTodo, addedTodo)
  },

  [todoOnUpdated](store, addedTodo, removePendingUpdateSyncTodo) {
    /**
     * Remove todo on onsync if have
     */
    removePendingUpdateSyncTodo(addedTodo)

    /**
     * Commit add sync todo
     */
    store.commit(updateSyncTodo, addedTodo)
  },
}