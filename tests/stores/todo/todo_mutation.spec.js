import todo_mutation from '../../../src/modules/todo/todo_mutation'
import todo_state from '../../../src/modules/todo/todo_state'

import {
  clearPendingAddUnsyncTodo,
  removePendingAddUnsyncTodo,
  removePendingRemoveSyncTodo,
  removePendingUpdateSyncTodo,
  setFilterKeywords,
  setFilterState,
  addSyncTodo,
  removeSyncTodo,
  updateSyncTodo,
  enableIgnoreFirstTodoAdded,
  disableIgnoreFirstTodoAdded
} from '../../../src/modules/todo/todo_mutation'

import {
  expect
} from 'chai'


describe('todo mutation', () => {
  const mockedAddTodo = {
    key: 123,
    completed: true,
    name: 'test123'
  }

  it('set ignoreFirstAddedTodo to true when enableIgnoreFirstTodoAdded', () => {
    const state = JSON.parse(JSON.stringify(todo_state))
    todo_mutation[enableIgnoreFirstTodoAdded](state)
    expect(state.isFirstTodoAdded).to.be.false
  })

  it('set ignoreFirstAddedTodo to false when disableIgnoreFirstTodoAdded', () => {
    const state = JSON.parse(JSON.stringify(todo_state))
    todo_mutation[disableIgnoreFirstTodoAdded](state)
    expect(state.isFirstTodoAdded).to.be.true
  })


  
  it('add todo to syncTodos when addSyncTodos', () => {
    const state = JSON.parse(JSON.stringify(todo_state))
    todo_mutation[addSyncTodo](state, mockedAddTodo)
    expect(state.syncTodos[0]).to.eql(mockedAddTodo)
  })

  it('remove todo from syncTodoso when removeSyncTodos', () => {
    const state = JSON.parse(JSON.stringify(todo_state))
    todo_mutation[addSyncTodo](state, mockedAddTodo)
    todo_mutation[removeSyncTodo](state, mockedAddTodo)
    expect(state.syncTodos).to.have.length(0)
  })

  it('update todo from syncTodo when updateSyncTodo', () => {
    const state = JSON.parse(JSON.stringify(todo_state))
    todo_mutation[addSyncTodo](state, mockedAddTodo)
    const mockedChangeTodo = Object.assign({}, mockedAddTodo, {
      name: 'test2'
    })
    todo_mutation[updateSyncTodo](state, mockedChangeTodo)
    expect(state.syncTodos[0]).to.eql(mockedChangeTodo)
  })

  it('should not update todo from syncTodo when updateSyncTodo not found key', () => {
    const state = JSON.parse(JSON.stringify(todo_state))
    todo_mutation[addSyncTodo](state, mockedAddTodo)
    
    const mockedChangeTodo = Object.assign({}, mockedAddTodo, {
      name: 'test2',
      key: 0,
      completed: false,
      a: 1
    })
    
    todo_mutation[updateSyncTodo](state, mockedChangeTodo)
    expect(state.syncTodos[0]).to.eql(mockedAddTodo)
  })


  it('clear pending add unsync todo when clearPendingAddUnsyncTodo', () => {
    const state = JSON.parse(JSON.stringify(todo_state))

    state.pendingAddUnsyncTodos = [{
      completed: false,
      name: '1234',
      key: 123
    }]

    todo_mutation[clearPendingAddUnsyncTodo](state)
    expect(state.pendingAddUnsyncTodos).to.be.eql([])
  })

  it('remove PendingAddUnsyncTodo todo with key when removePendingAddUnsyncTodo', () => {
    const state = JSON.parse(JSON.stringify(todo_state))

    state.pendingAddUnsyncTodos = [{
      completed: false,
      name: '123',
      key: 123
    }, {
      completed: false,
      name: '123',
      key: 1234
    }]

    todo_mutation[removePendingAddUnsyncTodo](state, 123)
    expect(state.pendingAddUnsyncTodos).to.have.length(1)
    expect(state.pendingAddUnsyncTodos).to.be.eql([{
      completed: false,
      name: '123',
      key: 1234
    }])
  })

  it('remove PendingRemoveSyncTodo todo with key when removePendingRemoveSyncTodo', () => {
    const state = JSON.parse(JSON.stringify(todo_state))

    state.pendingRemoveSyncTodos = [{
      completed: false,
      name: '123',
      key: 123
    }, {
      completed: false,
      name: '123',
      key: 1234
    }]

    todo_mutation[removePendingRemoveSyncTodo](state, 123)
    expect(state.pendingRemoveSyncTodos).to.have.length(1)
    expect(state.pendingRemoveSyncTodos).to.be.eql([{
      completed: false,
      name: '123',
      key: 1234
    }])
  })

  it('remove PendingUpdateSyncTodo todo with key when removePendingUpdateSyncTodo', () => {
    const state = JSON.parse(JSON.stringify(todo_state))

    state.pendingUpdateSyncTodos = [{
      completed: false,
      name: '123',
      key: 123
    }, {
      completed: false,
      name: '123',
      key: 1234
    }]

    todo_mutation[removePendingUpdateSyncTodo](state, 123)
    expect(state.pendingUpdateSyncTodos).to.have.length(1)
    expect(state.pendingUpdateSyncTodos).to.be.eql([{
      completed: false,
      name: '123',
      key: 1234
    }])
  })

  it('set filterKeywords when setFilterKeywords', () => {
    const state = JSON.parse(JSON.stringify(todo_state))
    todo_mutation[setFilterKeywords](state, 'test')
    expect(state.filterKeywords).to.equal('test')
  })

  it('set filterState when setFilterState', () => {
    const state = JSON.parse(JSON.stringify(todo_state))
    todo_mutation[setFilterState](state, 'test')
    expect(state.filterState).to.equal('test')
  })
})