export const setOnline = 'setOnline'
export const setOffline = 'setOffline'
export const enableLoading = 'enableLoading'
export const hideLoading = 'hideLoading'

export default {
  [setOnline] (state) {
    state.isOnline = true
  },

  [setOffline] (state) {
    state.isOnline = false
  },

  [enableLoading] (state) {
    state.isLoading = true 
  },

  [hideLoading] (state) {
    state.isLoading = false
  }
}