import router, {
  guardAuth,
  guardTodo,
  redirectRoot
} from '../../src/router'

import store from '../../src/store'

/**
 * Test libraries
 */

import {
  spy
} from 'sinon'

import {
  expect
} from 'chai'




describe('navigation guard', () => {
  describe('redirect root', () => {
    it('return /auth if not authenticate', () => {
      store.state.auth.user = null
      expect(redirectRoot()).to.equal('/auth')
    })

    it('return /todo if authenticate', () => {
      store.state.auth.user = {}
      expect(redirectRoot()).to.equal('/todo')
    })
  })

  describe('guard auth', () => {
    it('call next with empty arg if authenticate when go /todo', () => {
      store.state.auth.user = {}
      const mockedNext = spy()
      guardTodo(null, null, mockedNext)
      expect(mockedNext.callCount).to.equal(1)
      expect(mockedNext.args[0]).to.have.length(0)
    })

    it('call next with /auth if not authenticate when go /todo', () => {
      store.state.auth.user = null
      const mockedNext = spy()
      guardTodo(null, null, mockedNext)
      expect(mockedNext.args[0][0]).to.equal('/auth')
    })
  })

  describe('guard todo', () => {
    it('call next with /todo if authenticate when go /auth', () => {
      store.state.auth.user = {}
      const mockedNext = spy()
      guardAuth(null, null, mockedNext)
      expect(mockedNext.args[0][0]).to.equal('/todo')
    })

    it('call next with empty arg if not authenticate when go /auth', () => {
      store.state.auth.user = null
      const mockedNext = spy()
      guardAuth(null, null, mockedNext)
      expect(mockedNext.callCount).to.equal(1)
      expect(mockedNext.args[0]).to.have.length(0)
    })
  })
})