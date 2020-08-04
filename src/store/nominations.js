import axios from 'axios'

const nominations = {
  state: {
    loadingStatus: 'notLoading',
    nominations: []
  },
  mutations: {
    SET_LOADING_STATUS (state, status) {
      state.loadingStatus = status
    },
    SET_NOMINATIONS (state, nominations) {
      state.nominations = nominations
      console.log('nominations', JSON.stringify(state.nominations))
    }
  },
  actions: {
    fetchNominations (context) {
      context.commit('SET_LOADING_STATUS', 'loading')
      axios.get('https://localhost:5001/api/nomination').then(response => {
        context.commit('SET_LOADING_STATUS', 'notLoading')
        context.commit('SET_NOMINATIONS', response.data)
      })
    }
  },
  getters: {
  }
}

export default {
  nominations
}
