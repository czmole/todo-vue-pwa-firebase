export const getSyncTodoMatchKeywordAndFilterState = 'getSyncTodoMatchKeywordAndFilterState'
export const getUnSyncTodoMatchKeywordAndFilterState = 'GetUnSyncTodoMatchKeywordAndFilterState'

export function convertFilterStateToBool (filterState) {
  switch(filterState) {
    case 'Active': return false
    case 'Completed': return true
    default: return null
  }
}

export function filterTodosBaseOnFilterState (todos, filterState) {
  const boolFilterState = convertFilterStateToBool(filterState)
  if (boolFilterState===null)
    return todos
  return todos.filter(todo=>todo.completed === boolFilterState)
}

export function filterTodosBaseOnFilterKeywords (todos, filterKeywords) {
  return todos.filter(todo=>todo.name.includes(filterKeywords))
}

export default {
  [getSyncTodoMatchKeywordAndFilterState] (state) {
    const syncTodosFilterByFilterKeywords 
      = filterTodosBaseOnFilterState(state.syncTodos, state.filterState)
    
    const syncTodosFilterByFIlterKeywordsAndFilterState 
      = filterTodosBaseOnFilterKeywords(syncTodosFilterByFilterKeywords, state.filterKeywords)

    return syncTodosFilterByFIlterKeywordsAndFilterState
  },

  [getUnSyncTodoMatchKeywordAndFilterState] (state) {
    const syncTodosFilterByFilterKeywords 
      = filterTodosBaseOnFilterState(state.pendingAddUnsyncTodo, state.filterState)
    
    const syncTodosFilterByFIlterKeywordsAndFilterState 
      = filterTodosBaseOnFilterKeywords(syncTodosFilterByFilterKeywords, state.filterKeywords)

    return syncTodosFilterByFIlterKeywordsAndFilterState
  }
}