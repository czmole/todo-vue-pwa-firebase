import todo_mutation from '../../../src/modules/todo/todo_mutation'
import todo_state from '../../../src/modules/todo/todo_state'

import {
  clearPendingAddUnsyncTodo,
  removePendingAddUnsyncTodo,
  removePendingRemoveSyncTodo,
  removePendingUpdateSyncTodo,
  setFilterKeywords,
  setFilterState
} from '../../../src/modules/todo/todo_mutation'

import {
  expect
} from 'chai'


describe('todo mutation', () => {
  it('clear pending add unsync todo when clearPendingAddUnsyncTodo', () => {
    const state = Object.assign({}, todo_state)

    state.pendingAddUnsyncTodo = [{
      completed: false,
      name: '123',
      key: 123
    }]

    todo_mutation[clearPendingAddUnsyncTodo](state)
    expect(state.pendingAddUnsyncTodo).to.be.eql([])
  })

  it('remove PendingAddUnsyncTodo todo with key when removePendingAddUnsyncTodo', () => {
    const state = Object.assign({}, todo_state)

    state.pendingAddUnsyncTodo = [{
      completed: false,
      name: '123',
      key: 123
    }, {
      completed: false,
      name: '123',
      key: 1234
    }]

    todo_mutation[removePendingAddUnsyncTodo](state, 123)
    expect(state.pendingAddUnsyncTodo).to.have.length(1)
    expect(state.pendingAddUnsyncTodo).to.be.eql([{
      completed: false,
      name: '123',
      key: 1234
    }])
  })

  it('remove PendingRemoveSyncTodo todo with key when removePendingRemoveSyncTodo', () => {
    const state = Object.assign({}, todo_state)

    state.pendingRemoveSyncTodo = [{
      completed: false,
      name: '123',
      key: 123
    }, {
      completed: false,
      name: '123',
      key: 1234
    }]

    todo_mutation[removePendingRemoveSyncTodo](state, 123)
    expect(state.pendingRemoveSyncTodo).to.have.length(1)
    expect(state.pendingRemoveSyncTodo).to.be.eql([{
      completed: false,
      name: '123',
      key: 1234
    }])
  })

  it('remove PendingUpdateSyncTodo todo with key when removePendingUpdateSyncTodo', () => {
    const state = Object.assign({}, todo_state)

    state.pendingUpdateSyncTodo = [{
      completed: false,
      name: '123',
      key: 123
    }, {
      completed: false,
      name: '123',
      key: 1234
    }]

    todo_mutation[removePendingUpdateSyncTodo](state, 123)
    expect(state.pendingUpdateSyncTodo).to.have.length(1)
    expect(state.pendingUpdateSyncTodo).to.be.eql([{
      completed: false,
      name: '123',
      key: 1234
    }])
  })

  it('set filterKeywords when setFilterKeywords', () => {
    const state = Object.assign({}, todo_state)
    todo_mutation[setFilterKeywords](state, 'test')
    expect(state.filterKeywords).to.equal('test')
  })

  it('set filterState when setFilterState', () => {
    const state = Object.assign({}, todo_state)
    todo_mutation[setFilterState](state, 'test')
    expect(state.filterState).to.equal('test')
  })
})