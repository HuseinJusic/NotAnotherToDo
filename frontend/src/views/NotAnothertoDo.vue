<template>
  <DataTable :value="todos" :loading="this.loading">
    <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
    <Column headerStyle="width: 8em" bodyStyle="text-align: center">
      <template #body="slotProps">
        <Button type="button" icon="pi pi-pencil" class="p-button-warning" @click="$router.push('/notanothertodo/edit/' + slotProps.data.id)"></Button>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
export default {
  name: 'NotAnothertoDo',
  components: {
    DataTable,
    Column,
    Button
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
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' },
      { field: 'body', header: 'Body' }
    ]
  }),
  computed: {
    todos () {
      return this.$store.state.todo.todos
    }
  }
}
</script>

<style scoped>

</style>
