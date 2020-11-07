// import axios from 'axios'
// import moment from 'moment'

export default {
  namespaced: true,
  state: () => ({
    loggedIn: false
  }),
  mutations: {
    SET_BOOL_LOGGED_IN (state, bool) {
      state.loggedIn = bool
    }
  }
}
