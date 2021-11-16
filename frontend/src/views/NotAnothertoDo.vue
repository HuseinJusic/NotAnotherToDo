<template>
  <div class="notanothertodo-body">
    <div class="util-body">
      <Button class="add-button" icon="pi pi-plus" @click="$router.push('/notanothertodo/edit')"/>

      <Calendar
        class="calendar"
        v-model="selectedDate"
        :loading="this.loading"
        dateFormat="yy-mm-dd"
        :inline="false"
        :touchUI="isMobile"
         @date-select="loadNewDay"/>
    </div>

    <TodoList
    :todos ="todos"
    :is-mobile="isMobile"></TodoList>

  </div>

</template>

<script>
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'
import { determineBreakpoint, BreakpointValue } from '@/util/breakpoints'
import TodoList from '@/components/TodoList'

export default {
  name: 'NotAnothertoDo',
  components: {
    TodoList,
    Calendar,
    Button
  },
  created () {
    this.loading = true
    this.$store.dispatch('todo/load', this.selectedDate).then(() => {
      this.loading = false
    })
    window.addEventListener('resize', this.windowResize)
  },
  unmounted () {
    window.removeEventListener('resize', this.windowResize)
  },
  data: () => ({
    loading: false,
    breakpoint: determineBreakpoint(window.innerWidth),
    selectedDate: (new Date()).toISOString().split('T')[0]
  }),
  computed: {
    todos () {
      return this.$store.state.todo.todos
    },
    isMobile () {
      return this.breakpoint <= BreakpointValue.SM
    }
  },
  methods: {
    removetodo (todoId) {
      this.$store.dispatch('todo/remove', todoId)
    },
    toggle (todo) {
      this.$store.dispatch('todo/save', todo)
    },
    windowResize (resizeEvent) {
      this.breakpoint = determineBreakpoint(resizeEvent.currentTarget.innerWidth)
    },
    loadNewDay () {
      var tzoffset = (new Date()).getTimezoneOffset() * 60000

      this.$store.dispatch('todo/load', new Date(this.selectedDate - tzoffset).toISOString().split('T')[0]).then(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.row-button{
  margin-right: 20px;
}

.notanothertodo-body{

  display: flex;
  flex-direction: column;

  .util-body{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .add-button{
      height:36px;
      margin: 20px
    }

    .calendar{
      margin: 20px;
    }
  }
}
</style>
