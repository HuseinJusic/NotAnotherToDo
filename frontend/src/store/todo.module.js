import ToDoService from '@/services/todo.service'

const initialState = []

export const todo = {
  namespaced: true,
  state: initialState,
  actions: {
    load ({ commit }) {
      return ToDoService.getTodos().then(
        todos => {
          console.log(todos)
          commit('todoLoadSuccess', todos)
          return Promise.resolve(todos)
        },
        error => {
          console.log(error)
          commit('todoLoadError')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    todoLoadSuccess (state, todos) {
      state = todos
    },
    todoLoadError (state) {
      state = null
    }
  }
}
