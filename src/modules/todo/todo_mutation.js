export const setFilterKeywords = 'setFilterKeywords'
export const setFilterState = 'setFilterState'
export const clearPendingAddUnsyncTodo = 'clearPendingAddUnsyncTodo'

export const removePendingAddUnsyncTodo = 'removePendingAddUnsyncTodo'
export const removePendingUpdateSyncTodo = 'removePendingUpdateSyncTodo'
export const removePendingRemoveSyncTodo = 'removePendingRemoveSyncTodo'

export const addSyncTodo = 'addSyncTodo'
export const removeSyncTodo = 'removeSyncTodo'
export const updateSyncTodo = 'updateSyncTodo'

export const enableIgnoreFirstTodoAdded = 'enableIgnoreFirstTodoAdded'
export const disableIgnoreFirstTodoAdded = 'disableIgnoreFirstTodoAdded'

export default {
  [enableIgnoreFirstTodoAdded] (state) {
    this.state.isFirstTodoAdded = true
  },

  [disableIgnoreFirstTodoAdded] (state) {
    this.state.isFirstTodoAdded = true
  },

  [addSyncTodo](state, todo) {
    state.syncTodos.push(todo)
  },

  [removeSyncTodo](state, removedTodo) {
    state.syncTodos = state.syncTodos.filter(todo => todo.key !== removedTodo.key)
  },

  [updateSyncTodo](state, updatedTodo) {
    const index = state.syncTodos.findIndex(todo => todo.key === updatedTodo.key)
    if (index > 0) {
      state.syncTodos[index] = updatedTodo
    }
  },

  [setFilterKeywords](state, filterKeywords) {
    state.filterKeywords = filterKeywords
  },

  [setFilterState](state, filterState) {
    state.filterState = filterState
  },

  [clearPendingAddUnsyncTodo](state) {
    state.pendingAddUnsyncTodos = new Array()
  },

  [removePendingAddUnsyncTodo](state, key) {
    state.pendingAddUnsyncTodos = state.pendingAddUnsyncTodos.filter(todo => todo.key !== key)
  },

  [removePendingRemoveSyncTodo](state, key) {
    state.pendingRemoveSyncTodos = state.pendingRemoveSyncTodos.filter(todo => todo.key !== key)
  },

  [removePendingUpdateSyncTodo](state, key) {
    state.pendingUpdateSyncTodos = state.pendingUpdateSyncTodos.filter(todo => todo.key !== key)
  },
}