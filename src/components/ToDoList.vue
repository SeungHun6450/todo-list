<template>
  <ul ref="todoList">
    <TodoItem 
      v-for="todo in todos"
      :id="todo.id"
      :key="todo.order"
      :done="todo.done"
      :order="todo.order"
      :created-at="todo.createdAt"
      :updated-at="todo.updatedAt"
      :title="todo.title" />
  </ul>
</template>

<script>
import TodoItem from './TodoItem.vue'
import Sortable from 'sortablejs'

export default {
  components: {
    TodoItem
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
  mounted() {
    this.initSortable()
  },
  methods: {
    async readTodoList(done) {
      // store에 있는 action메소드 실행
      this.$store.dispatch('readTodoList', done)
    },
    reorderTodo(oldIndex, newIndex) {
      let event = {oldIndex, newIndex}
      this.$store.dispatch('reorderTodo', event)
    },
    initSortable() {
      new Sortable(this.$refs.todoList, {
        handle: '.handle',
        delay: 50,
        animation: 0,
        forceFallback: true, 
        onEnd: event => {
          this.reorderTodo(event.oldIndex, event.newIndex)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  ul {
    padding: 0px;
    width: 539px;
    height: 620px;
    overflow-y: visible;
    overflow-x: hidden;
  }
</style>
