<template>
  <DataTable :value="todos" :loading="this.loading">
    <Column field="checked" header="Done" key="checked">
      <template #body="{data}">
        <Checkbox v-model="data.checked" :binary="true" :key="'checked-'+data.id" @change="toggle(data)"/>
      </template>
    </Column>
    <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
    <Column headerStyle="width: 8em" bodyStyle="text-align: center">
      <template #header>
        <Button type="button" icon="pi pi-plus"  @click="$router.push('/notanothertodo/edit/')"></Button>
      </template>
      <template #body="slotProps">
        <Button type="button" icon="pi pi-trash" class="p-button-danger row-button" @click="removetodo(slotProps.data.id)"></Button>
        <Button type="button" icon="pi pi-pencil" class="p-button-warning" @click="$router.push('/notanothertodo/edit/' + slotProps.data.id)"></Button>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
export default {
  name: 'NotAnothertoDo',
  components: {
    DataTable,
    Column,
    Button,
    Checkbox
  },
  created () {
    this.loading = true
    this.$store.dispatch('todo/load').then(() => {
      this.loading = false
    })
    console.log(this.todos)
  },
  data: () => ({
    loading: false,
    columns: [
      { field: 'title', header: 'Title' },
      { field: 'body', header: 'Body' },
      { field: 'planed', header: 'Planed' },
      { field: 'points', header: 'Points' }
    ]
  }),
  computed: {
    todos () {
      return this.$store.state.todo.todos
    }
  },
  methods: {
    removetodo (todoId) {
      this.$store.dispatch('todo/remove', todoId)
    },
    toggle (todo) {
      this.$store.dispatch('todo/save', todo)
    }
  }
}
</script>

<style scoped>
.row-button{
  margin-right: 20px;
}
</style>
