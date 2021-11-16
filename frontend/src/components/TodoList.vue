<template>
  <div class="todolist">
    <div class="todolist-header"></div>
    <div class="todolist-body">
      <ToDoListElement
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      ></ToDoListElement>
    </div>

  </div>
</template>

<script>
import ToDoListElement from '@/components/ToDoListElement'
export default {
  name: 'TodoList',
  components: { ToDoListElement },
  props: {
    todos: {
      type: Array,
      required: true
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">

.todolist{
  margin: 20px;
}

</style>
