import ToDoService from '@/services/todo.service'

const initialState = []

export const todo = {
  namespaced: true,
  state: initialState,
  actions: {
    load ({ commit }) {
      return ToDoService.getTodos().then(
        todos => {
          commit('todoLoadSuccess', todos)
          return Promise.resolve(todos)
        },
        error => {
          commit('todoLoadError', error)
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    todoLoadSuccess (state, todos) {
      state.status = todos.status
      state.todos = todos.data
    },
    todoLoadError (state, error) {
      state.status = error.status
    }
  }
}
