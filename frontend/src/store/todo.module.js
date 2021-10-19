import ToDoService from '@/services/todo.service'

const initialState = {
  status: null,
  todos: [],
  selected: null
}

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
    },
    get ({ commit }, todoId) {
      return ToDoService.getTodo(todoId).then(
        todo => {
          commit('getSuccess', todo)
          return Promise.resolve(todo)
        },
        error => {
          commit('todoLoadError', error)
          return Promise.reject(error)
        }
      )
    },
    save ({ commit }, todo) {
      return ToDoService.saveTodo(todo).then(
        res => {
          commit('getSuccess', res)
          return Promise.resolve(res)
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
    getSuccess (state, todo) {
      state.status = todo.status
      state.selected = todo.data
    },
    todoLoadError (state, error) {
      state.status = error.status
    }
  }
}
