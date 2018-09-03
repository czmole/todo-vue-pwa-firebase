import auth_state from '../../../src/modules/auth/auth_state'
import auth_mutation from '../../../src/modules/auth/auth_mutation'

import {
  authUser,
  signOut  
} from '../../../src/modules/auth/auth_mutation'

import {
  expect
} from 'chai'

describe('auth mutation', () => {
  it('should set user when authUser', () => {
    const state = Object.assign({}, auth_state)
    auth_mutation[authUser](state, {})
    expect(state.user).to.be.eql({})
  })

  it('should set user to null when signOut', () => {
    const state = Object.assign({}, auth_state)
    state.user = {}
    auth_mutation[signOut](state)
    expect(state.user).to.be.null
  })
})