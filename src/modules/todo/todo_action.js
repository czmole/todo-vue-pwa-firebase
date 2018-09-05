export const todoOnAdded = 'todoOnAdded'
export const todoOnRemoved = 'todoOnRemoved'
export const todoOnUpdated = 'todoOnUpdated'

import {
  addSyncTodo,
  removeSyncTodo,
  updateSyncTodo
} from './todo_mutation'

export default {
  [todoOnAdded](store, addedTodo, removePendingAddUnsyncTodo) {
    /**
     * Remove todo on onsync if have
     */
    removePendingAddUnsyncTodo(addedTodo)

    /**
     * Commit add sync todo
     */
    store.commit(addSyncTodo, addedTodo)
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