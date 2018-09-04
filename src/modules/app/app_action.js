export const initApp = 'initApp'
export const onConectivityChange = 'onConectivityChange'
export const watchConnectivityChange = 'watchConectivityChange'

export default {
  [watchConnectivityChange](
    store,
    loadTodo,
    watchTodo,
    unwatchTodo
  ) {
    const conectivityRef = firebase.database().ref(".info/connected")
    conectivityRef.on('value', (snap) => {
      this[watchConnectivityChange](
        store,
        snap.val(),
        loadTodo,
        watchTodo,
        unwatchTodo
      )
    })
  },

  [onConectivityChange](
    store,
    isOnline,
    loadTodo,
    watchTodo,
    unwatchTodo
  ) {
    if (store.state.auth.user) {
      if (isOnline) {
        store.commit('setOnline')
        store.commit('showLoading')
        watchTodo()
        loadTodo()
      } else {
        store.commit('setOffline')
        unwatchTodo()
      }
    }
  },

  [initApp](
    store,
    loadTodo,
    watchTodo
  ) {
    if (store.state.auth.user) {
      store.commit('showLoading')
      loadTodo()
      watchTodo()
    }
  }
}