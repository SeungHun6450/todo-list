<template>
  <ul>
    <TodoItemVue 
      v-for="todo in todos"
      :id="todo.id"
      :key="todo.id"
      :done="todo.done"
      :order="todo.order"
      :created-at="todo.createdAt"
      :updated-at="todo.updatedAt"
      :title="todo.title" />
  </ul>
</template>

<script>
import TodoItemVue from './TodoItem.vue'

export default {
  components: {
    TodoItemVue
  },
  computed:{
    // store에 있는 state에 있는 todos를 가져온다.
    todos(){
      return this.$store.state.todos
    }
  },
  created() {
    this.readTodoList()
  },
  methods: {
    async readTodoList() {
      // store에 있는 action메소드 실행
      this.$store.dispatch('readTodoList')
    }
  }
}
</script>
