import axios from 'axios'
import authHeader from '@/services/auth-header'

const API_URL = '/api/todo/'

class ToDoService {
  getTodos () {
    return axios.get(API_URL, { headers: authHeader() })
  }

  getTodo (todoId) {
    return axios.get(API_URL + todoId, { headers: authHeader() })
  }

  saveTodo (todo) {
    return axios.post(API_URL, JSON.stringify(todo), { headers: authHeader() })
  }

  removeToDo (todo) {
    return axios.delete(API_URL + todo.id, { headers: authHeader() })
  }
}

export default new ToDoService()
