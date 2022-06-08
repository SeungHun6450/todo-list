<template>
  <ul>
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
  // mounted() {
  //   this.initSortable()
  // },
  methods: {
    async readTodoList(done) {
      // store에 있는 action메소드 실행
      this.$store.dispatch('readTodoList', done)
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
