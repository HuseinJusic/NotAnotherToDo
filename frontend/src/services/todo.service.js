import axios from 'axios'
import authHeader from '@/services/auth-header'

const API_URL = '/api/todo/'

class ToDoService {
  getTodos (selectedDate) {
    return axios.get(API_URL + 'all?planed=' + selectedDate + '', { headers: authHeader() })
  }

  getTodo (todoId) {
    return axios.get(API_URL + todoId, { headers: authHeader() })
  }

  saveTodo (todo) {
    return axios.post(API_URL, JSON.stringify(todo), { headers: authHeader() })
  }

  removeToDo (todoId) {
    return axios.delete(API_URL + todoId, { headers: authHeader() })
  }
}

export default new ToDoService()
