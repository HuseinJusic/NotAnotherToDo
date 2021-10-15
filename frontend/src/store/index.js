import { createStore } from 'vuex'

import { auth } from './auth.module'
import { todo } from './todo.module'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    todo
  }
})
