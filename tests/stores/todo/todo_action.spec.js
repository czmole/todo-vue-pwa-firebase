import todo_action, {
  todoOnAdded,
  todoOnRemoved,
  todoOnUpdated,
  watchTodo
} from '../../../src/modules/todo/todo_action';

import {
  addSyncTodo,
  updateSyncTodo,
  removeSyncTodo,
  disableIgnoreFirstTodoAdded,
  enableIgnoreFirstTodoAdded,
} from '../../../src/modules/todo/todo_mutation'

import todo_state from '../../../src/modules/todo/todo_state'
import {
  expect
} from 'chai'
import {
  spy
} from 'sinon'

describe('todo action', () => {
  describe('watch todo', () => {
    it('commit enableIgnoreFirstAddedTodo if have no sync todo inside', () => {
      const mockedCommit = spy()
      const mockedStore = {
        todo: {
          syncTodos: [
            { name: 'abc', key: 123, completed: false }
          ],
        },
        commit: mockedCommit
      }

      /**
       * Assert
       */
      todo_action[watchTodo](mockedStore)
      expect(mockedCommit.calledOnceWith(enableIgnoreFirstTodoAdded)).to.be.true
    })

    it('commit disableIgnoreFirstAddedTodo if have sync todo inside', () => {
      const mockedCommit = spy()
      const mockedStore = {
        todo: {
          syncTodos: [

          ],
        },
        commit: mockedCommit
      }

      /**
       * Assert
       */
      todo_action[watchTodo](mockedStore)
      expect(mockedCommit.calledOnceWith(disableIgnoreFirstTodoAdded)).to.be.true
    })
  })


  describe('todoOnAdded Change Feed', () => {
    it('commit disableIgnoreFirstAddedTodo when ignore first todo', () => {
      const mockedCommit = spy()
      const mockedStore = {
        state: {
          todo: {
            syncTodos: [

            ],
          },
        },
        commit: mockedCommit
      }
      todo_action[todoOnAdded](mockedStore, null, null)
      expect(mockedCommit.args[0][0]).to.equal(disableIgnoreFirstTodoAdded)
    })



    describe('when not ignore first todo', () => {
      it('commit addSyncTodo when todoOnAddedChangeFeed and call removePendingSyncTodo with addedTodo if isFirstTodoAdded is true', () => {
        const mockedCommit = spy()
        const mockedStore = {
          state: {
            todo: {
              syncTodos: [
                { name: 'test', completed: true, key: 123}
              ],
            },
            isFirstTodoAdded: true
          },
          commit: mockedCommit
        }
        const mockedAddTodo = { name: 'test', completed: true, key: 123}
        todo_action[todoOnAdded](mockedStore, mockedAddTodo)
        // /**
        //  * Test Commit
        //  */
        expect(mockedCommit.calledWith(addSyncTodo, mockedAddTodo))
      })
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

    it('call removePendingSyncTodo with addedTodo', () => {
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

    it('call removePendingSyncTodo with addedTodo', () => {
      expect(mockedRemovePending.args[0][0]).to.eql(mockedDeleteTodo)
    })
  })
})