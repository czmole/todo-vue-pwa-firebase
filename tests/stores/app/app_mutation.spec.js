import app_state from '../../../src/modules/app/app_state'
import app_mutation from '../../../src/modules/app/app_mutation'

import {
  setOffline,
  setOnline,
  enableLoading,
  hideLoading
} from '../../../src/modules/app/app_mutation'

import {
  expect
} from 'chai'

/**
 * Test
 */
describe('app_mutation', () => {
  it('set isOnline = false when setOffline', () => {
    const state = Object.assign({}, app_state)
    state.isOnline = false
    app_mutation[setOnline](state)
    expect(state.isOnline).to.be.true
  })

  it('set isOnline = true when setOnline', () => {
    const state = Object.assign({}, app_state)
    state.isOnline = true
    app_mutation[setOffline](state)
    expect(state.isOnline).to.be.false
  })

  it('set isLoading = true when enableLoading', () => {
    const state = Object.assign({}, app_state)
    state.isLoading = false
    app_mutation[enableLoading](state)
    expect(state.isLoading).to.be.true
  })

  it('set isLoading = false when hideLoading', () => {
    const state = Object.assign({}, app_state)
    state.isLoading = true
    app_mutation[hideLoading](state)
    expect(state.isLoading).to.be.false
  })
})