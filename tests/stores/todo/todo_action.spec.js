import todo_action, {
  todoOnAdded,
  todoOnRemoved,
  todoOnUpdated
} from '../../../src/modules/todo/todo_action';

import {
  addSyncTodo,
  updateSyncTodo,
  removeSyncTodo
} from '../../../src/modules/todo/todo_mutation'

import todo_state from '../../../src/modules/todo/todo_state'
import {
  expect
} from 'chai'
import {
  spy
} from 'sinon'

describe('todo action', () => {
  describe('todoOnAdded Change Feed', () => {
    /**
     * Setup
     */
    const mockedCommit = spy()
    const mockedAddTodo = {
      key: '123',
      completed: false,
      name: 'test'
    }
    const mockedStore = {
      state: Object.assign({}, todo_state),
      commit: mockedCommit
    }

    const mockedRemovePendingAsyncTodo = spy()
    todo_action[todoOnAdded](
      mockedStore,
      mockedAddTodo,
      mockedRemovePendingAsyncTodo
    )

    it('commit addSyncTodo when todoOnAddedChangeFeed', () => {
      /**
       * Test Commit
       */
      expect(mockedCommit.args[0][0]).to.equal(addSyncTodo)
      expect(mockedCommit.args[0][1]).to.eql(mockedAddTodo)
    })

    it('call removePendingSyncTodo with addedTodo' , () => {
      expect(mockedRemovePendingAsyncTodo.args[0][0]).to.eql(mockedAddTodo)
    })
  })

  describe('todoOnUpdated Change Feed', () => {
    /**
     * Setup
     */
    const mockedCommit = spy()
    const mockedUpdatedTodo = {
      key: '123',
      completed: false,
      name: 'test'
    }
    const mockedStore = {
      state: Object.assign({}, todo_state),
      commit: mockedCommit
    }

    const mockedPendingFunction = spy()
    todo_action[todoOnUpdated](
      mockedStore,
      mockedUpdatedTodo,
      mockedPendingFunction
    )

    it('commit updateSyncTodo when todoOnAddedChangeFeed', () => {
      /**
       * Test Commit
       */
      expect(mockedCommit.args[0][0]).to.equal(updateSyncTodo)
      expect(mockedCommit.args[0][1]).to.eql(mockedUpdatedTodo)
    })

    it('call removePendingSyncTodo with addedTodo' , () => {
      expect(mockedPendingFunction.args[0][0]).to.eql(mockedUpdatedTodo)
    })
  })

  describe('todoOnDelete ', () => {
    /**
     * Setup
     */
    const mockedCommit = spy()
    const mockedDeleteTodo = {
      key: '123',
      completed: false,
      name: 'test'
    }
    const mockedStore = {
      state: Object.assign({}, todo_state),
      commit: mockedCommit
    }

    const mockedRemovePending = spy()
    todo_action[todoOnRemoved](
      mockedStore,
      mockedDeleteTodo,
      mockedRemovePending
    )

    it('commit addSyncTodo when todoOnAddedChangeFeed', () => {
      /**
       * Test Commit
       */
      expect(mockedCommit.args[0][0]).to.equal(removeSyncTodo)
      expect(mockedCommit.args[0][1]).to.eql(mockedDeleteTodo)
    })

    it('call removePendingSyncTodo with addedTodo' , () => {
      expect(mockedRemovePending.args[0][0]).to.eql(mockedDeleteTodo)
    })
  })
})