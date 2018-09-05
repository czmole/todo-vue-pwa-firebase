import todo_getter from '../../../src/modules/todo/todo_getter'
import todo_state from '../../../src/modules/todo/todo_state'

import {
  convertFilterStateToBool,
  filterTodosBaseOnFilterKeywords,
  filterTodosBaseOnFilterState,
  getSyncTodoMatchKeywordAndFilterState,
  getUnSyncTodoMatchKeywordAndFilterState
} from '../../../src/modules/todo/todo_getter'

import {
  expect
} from 'chai'


let mockedTodos = [
  { key: 123, completed: true, name: 'test' },
  { key: 123, completed: false, name: 'test123' },
  { key: 123, completed: false, name: 'noname' }
]

let mockedState = {
  filterKeywords: 'test',
  filterState: 'Completed',
  syncTodos: [
    { key: 123, completed: true, name: 'sync_test' },
    { key: 123, completed: false, name: 'sync_test123' },
    { key: 123, completed: false, name: 'sync _noname' }
  ],
  
  pendingAddUnsyncTodos: [
    { key: 123, completed: true, name: 'unsync_test' },
    { key: 123, completed: false, name: 'unsync_test123' },
    { key: 123, completed: false, name: 'unsync _noname' }
  ]
}

describe('todo getter', () => {
  describe('utilities', () => {
    describe('convertFilterStateToBool', () => {
      it('return true if filterState is Completed', () => {
        expect(convertFilterStateToBool('Completed')).to.be.true
      })

      it('return false if filterState is Active', () => {
        expect(convertFilterStateToBool('Active')).to.be.false
      })
      it('return null if filterState is All', () => {
        expect(convertFilterStateToBool('All')).to.be.null
      })
    })

    it('return todos match keywords when filterTodosBaseOnFilterKeywords', () => {
      expect(filterTodosBaseOnFilterKeywords(mockedTodos, 'test')).to.eql([
        { key: 123, completed: true, name: 'test' },
        { key: 123, completed: false, name: 'test123' },
      ])
    })

    describe('filterTodosBaseOnFilterState', () => {
      it('return todos match filterState when filterTodosBaseOnFilterState when filterState is Completed', () => {
        expect(filterTodosBaseOnFilterState(mockedTodos, 'Completed')).to.eql([
          { key: 123, completed: true, name: 'test' },
        ])
      })
      it('return todos match filterState when filterTodosBaseOnFilterState when filterState is Active', () => {
        expect(filterTodosBaseOnFilterState(mockedTodos, 'Active')).to.eql([
          { key: 123, completed: false, name: 'test123' },
          { key: 123, completed: false, name: 'noname' }
        ])
      })
      it('return todos match filterState when filterTodosBaseOnFilterState when filterState is All', () => {
        expect(filterTodosBaseOnFilterState(mockedTodos, 'All')).to.eql([
          { key: 123, completed: true, name: 'test' },
          { key: 123, completed: false, name: 'test123' },
          { key: 123, completed: false, name: 'noname' }
        ])
      })
    })
  })

  describe('getter', () => {
    it("get sync todo that match getSyncTodoMatchKeywordAndFilterState", () => {
      expect(todo_getter[getSyncTodoMatchKeywordAndFilterState](mockedState)).to.eql([
        { key: 123, completed: true, name: 'sync_test' },
      ])
    })

    it("get unsync todo that match getSyncTodoMatchKeywordAndFilterState", () => {
      expect(todo_getter[getUnSyncTodoMatchKeywordAndFilterState](mockedState)).to.eql([
        { key: 123, completed: true, name: 'unsync_test' },
      ])
    })
  })
})