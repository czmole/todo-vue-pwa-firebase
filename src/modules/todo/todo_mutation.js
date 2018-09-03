export const setFilterKeywords = 'setFilterKeywords'
export const setFilterState = 'setFilterState'
export const clearPendingAddUnsyncTodo = 'clearPendingAddUnsyncTodo'

export const removePendingAddUnsyncTodo = 'removePendingAddUnsyncTodo'
export const removePendingUpdateSyncTodo = 'removePendingUpdateSyncTodo'
export const removePendingRemoveSyncTodo = 'removePendingRemoveSyncTodo'

export default {
  [setFilterKeywords] (state, filterKeywords) {
    state.filterKeywords = filterKeywords
  },

  [setFilterState] (state, filterState) {
    state.filterState = filterState
  },

  [clearPendingAddUnsyncTodo] (state) {
    state.pendingAddUnsyncTodo = new Array()
  },

  [removePendingAddUnsyncTodo] (state, key) {
    state.pendingAddUnsyncTodo = state.pendingAddUnsyncTodo.filter(todo=>todo.key!==key)  
  },

  [removePendingRemoveSyncTodo] (state, key) {
    state.pendingRemoveSyncTodo = state.pendingRemoveSyncTodo.filter(todo=>todo.key!==key)
  },

  [removePendingUpdateSyncTodo] (state, key) {
    state.pendingUpdateSyncTodo = state.pendingUpdateSyncTodo.filter(todo=>todo.key!==key)
  }
}