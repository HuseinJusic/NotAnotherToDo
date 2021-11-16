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
    load ({ commit }, selectedDate = null) {
      return ToDoService.getTodos(selectedDate).then(
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
          commit('saveSuccess', res.data)
          return Promise.resolve(res)
        },
        error => {
          commit('todoLoadError', error)
          return Promise.reject(error)
        }
      )
    },
    remove ({ commit }, todoId) {
      return ToDoService.removeToDo(todoId).then(
        res => {
          commit('removeSuccess', todoId)
          return Promise.resolve(res)
        },
        error => {
          commit('removeError', error)
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
      for (let i = 0; i < state.todos.length; i++) {
        if (state.todos[i].id === todo.data.id) {
          state.todos[i] = todo.data
        }
      }
      state.selected = todo.data
    },
    saveSuccess (state, todo) {
      for (let i = 0; i < state.todos.length; i++) {
        if (state.todos[i].id === todo.id) {
          state.todos[i] = todo
          return
        }
      }
      state.todos = { ...state.todos, todo }
      state.selected = todo
    },
    removeSuccess (state, todoId) {
      state.todos = state.todos.filter(todo => todo !== todoId)
    },
    removeError (state, todo) {
      console.log(todo)
    },
    todoLoadError (state, error) {
      state.status = error.status
    }
  }
}
