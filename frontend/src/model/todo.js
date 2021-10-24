export default class Todo {
  constructor (title, body, id = null, checked = null, planed = null, points = null) {
    this.id = id
    this.title = title
    this.body = body
    this.checked = checked
    this.planed = planed
    this.points = points
  }
}
