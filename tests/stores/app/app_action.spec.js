import { expect } from 'chai'
import app_action, {
  initApp,
  onConectivityChange,
} from '../../../src/modules/app/app_action'
import { spy } from 'sinon'

describe('app action', () => {
  describe('init application if auth', () => {
    const mockedCommit = spy()
    const mockedStore = {
      state: {
        auth: {
          user: {}
        }
      },
      commit: mockedCommit
    }
    const mockedLoadTodo = spy()
    const mockedWatchTodo = spy()

    app_action[initApp](
      mockedStore,
      mockedLoadTodo,
      mockedWatchTodo
    )

    it('commit showLoading', () => {
      expect(mockedCommit.callCount).to.equal(1)
      expect(mockedCommit.args[0][0]).to.equal('showLoading')
    })

    it('call load todo', () => {
      expect(mockedLoadTodo.callCount).to.equal(1)
    })
    
    it('call watch todo', () => {
      expect(mockedWatchTodo.callCount).to.equal(1)
    })
  })

  describe('on connectivity', () => {

    describe('if online and auth', () => {
      const mockedCommit = spy()
      const mockedStore = {
        state: {
          auth: {
            user: {}
          }
        },
        commit: mockedCommit
      }
      const mockedLoadTodo = spy()
      const mockedWatchTodo = spy()
      const mockedUnwatchTodo = spy()
      const isOnline = true

      app_action[onConectivityChange](
        mockedStore,
        isOnline,
        mockedLoadTodo,
        mockedWatchTodo,
        mockedUnwatchTodo
      )

      it('should dispatch watch todo', () => {
        expect(mockedWatchTodo.calledOnce).to.be.true
      })

      it('should dispatch load todo', () => {
        expect(mockedLoadTodo.calledOnce).to.be.true
      })

      it('should commit show loading', () => {
        expect(mockedCommit.calledWith('showLoading'))
      })

      it('should commit set online', () => {
        expect(mockedCommit.calledWith('setOnline'))
      })
    })

    describe('if offline and auth', () => {
      const mockedCommit = spy()
      const mockedStore = {
        state: {
          auth: {
            user: {}
          }
        },
        commit: mockedCommit
      }
      const mockedLoadTodo = spy()
      const mockedWatchTodo = spy()
      const mockedUnwatchTodo = spy()
      const isOnline = false

      app_action[onConectivityChange](
        mockedStore,
        isOnline,
        mockedLoadTodo,
        mockedWatchTodo,
        mockedUnwatchTodo
      )

      it('should dispatch unwatch todo', () => {
        expect(mockedUnwatchTodo.calledOnce).to.be.true
      })

      it('should dispatch set offlines', () => {
        expect(mockedCommit.calledOnceWith('setOffline')).to.be.true
      })
    })

    it('do commit nothing if not auth', () => {

    })
  })
})