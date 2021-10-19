export default class Todo {
  constructor (title, body, id = null) {
    this.id = id
    this.title = title
    this.body = body
  }
}
