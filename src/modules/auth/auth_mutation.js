export const authUser = 'authUser'
export const signOut = 'signOut'

export default {
  [authUser](state, user) {
    state.user = user
  },

  [signOut](state) {
    state.user = null
  }
}