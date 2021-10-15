import axios from 'axios'
import authHeader from '@/services/auth-header'

const API_URL = '/api/todo/'

class ToDoService {
  getTodos () {
    return axios.get(API_URL, { headers: authHeader() })
  }

  removeToDo (todo) {
    return axios.delete(API_URL + todo.id, { headers: authHeader() })
  }
}

export default new ToDoService()
