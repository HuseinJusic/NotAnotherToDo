<template>
  <div class="TodoListItem">
    <Checkbox class="todoListItem-checked" v-model="isChecked" :binary="true"></Checkbox>
    <div class="todoListItem-label" @click="$router.push('/notanothertodo/edit/' + this.todo.id)">
      <span class="todoListItem-label__title">{{this.todo.title}}</span>
      <span class="todoListItem-label__body">{{this.todo.body}}</span>
    </div>

    <div class="todoListItem-points">
      <span class="todoListItem-points__label">pt. {{this.todo.points}}</span>
    </div>
  </div>
</template>

<script>

import Checkbox from 'primevue/checkbox'

export default {
  name: 'ToDoListElement',
  components: {
    Checkbox
  },
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  computed: {
    isChecked: {
      get () {
        return this.todo.checked
      },
      set (value) {
        this.$store.dispatch('todo/save', { ...this.todo, checked: value })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .TodoListItem{
    display: flex;
    height: 50px;
    align-items: center;
    width: 100%;

    .todoListItem-checked{
      width: 20px;
    }

    .todoListItem-label{
      margin: 0 20px;
      display: flex;
      flex-direction: column;
      max-width: calc(100% - 110px);

      .todoListItem-label__title{
      }

      .todoListItem-label__body{
        color: #686868;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .todoListItem-points{
      min-width: 30px;
      text-align: end;
      margin-left: auto;
      .todoListItem-points__label{

      }
    }

  }
</style>
