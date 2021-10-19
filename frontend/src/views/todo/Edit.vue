<template>
  <div class="edit">
      edit
    {{JSON.stringify(this.todo)}}
    <InputText type="text" v-model="todo.title" />
    <InputText type="text" v-model="todo.body" />
    <Button label="save" @click="save"/>
  </div>
</template>

<script>

import Todo from '@/model/todo'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

export default {
  name: 'EditToDo',
  data: () => ({
    id: null,
    loading: false,
    todo: null
  }),
  created () {
    this.id = this.$route.params.id
    this.todo = this.id ? this.loadToDo() : new Todo('', '')
  },
  methods: {
    async loadToDo () {
      this.loading = true
      await this.$store.dispatch('todo/get', this.id).then((todo) => {
        this.loading = false
        this.todo = this.$store.state.todo.selected
      })
    },
    save () {
      this.$store.dispatch('todo/save', this.todo).then(
        todo => {
          this.loading = false
          this.todo = this.$store.state.todo.selected

          this.$router.push('/notanothertodo/edit/' + this.todo.id)
        },
        error => {
          console.log(error)
          this.loading = false
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        }
      )
    }
  },
  components: {
    Button,
    InputText
  }
}
</script>
