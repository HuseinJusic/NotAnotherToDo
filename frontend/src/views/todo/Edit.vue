<template>
  <div class="edit">
    <span class="input p-float-label">
            <InputText id="title" type="text" v-model="todo.title" />
            <label for="title">Title</label>
    </span>
    <span class="input p-float-label">
            <InputText id="body" type="text" v-model="todo.body" />
            <label for="body">Body</label>
    </span>
    <span class="input p-float-label">
            <Calendar
              id="planed"
              class="calendar"
              v-model="todo.planed"
              dateFormat="yy-mm-dd"
              :inline="false"
              :touchUI="isMobile"
              @date-select="loadNewDay"/>
            <label for="planed">Planed</label>
    </span>
    <span class="input p-float-label">
            <InputNumber id="points" type="text" v-model="todo.points" showButtons buttonLayout="horizontal" :step="1"
                         decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"/>
            <label class="number-label" for="points">Points</label>
    </span>
    <Button class="save-btn" label="save" @click="save"/>
    <Button class="p-button-danger" v-if="todo.id" label="delete" @click="remove"/>
  </div>
</template>

<script>

import Todo from '@/model/todo'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { determineBreakpoint, BreakpointValue } from '@/util/breakpoints'

export default {
  name: 'EditToDo',
  data: () => ({
    id: null,
    loading: false,
    breakpoint: determineBreakpoint(window.innerWidth),
    todo: null
  }),
  created () {
    this.id = this.$route.params.id
    this.todo = this.id ? this.loadToDo() : new Todo('', '')
    window.addEventListener('resize', this.windowResize)
  },
  unmounted () {
    window.removeEventListener('resize', this.windowResize)
  },
  computed: {
    isMobile () {
      return this.breakpoint <= BreakpointValue.SM
    }
  },
  methods: {
    windowResize (resizeEvent) {
      this.breakpoint = determineBreakpoint(resizeEvent.currentTarget.innerWidth)
    },
    async loadToDo () {
      this.loading = true
      await this.$store.dispatch('todo/get', this.id).then((todo) => {
        this.loading = false
        this.todo = this.$store.state.todo.selected
      })
    },
    loadNewDay (val) {
      console.log(val)
      var tzoffset = (new Date()).getTimezoneOffset() * 60000
      this.todo.planed = new Date(val - tzoffset).toISOString().split('T')[0]
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
    },
    remove () {
      this.$store.dispatch('todo/remove', this.todo.id).then(
        todo => {
          this.$router.push('/notanothertodo')
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
    InputText,
    Calendar,
    InputNumber
  }
}
</script>

<style scoped lang="scss">
.edit{

  display: flex;
  flex-direction: column;

  margin: 20px;
  width: calc(100%- 40px);
  .input{
    margin-bottom: 40px;
    .p-inputtext{
      width: 100%;
    }

    .p-calendar{
      width: 100%;
      .p-inputtext{
        width: 100%;
      }
    }

    .p-inputnumber{
      width: 100%;
    }
    .number-label{
      margin-left: 40px;
    }
  }
  .save-btn{
    margin-bottom: 20px;
  }
}
</style>
