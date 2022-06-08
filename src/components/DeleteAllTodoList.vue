<template>
  <button
    class="all_delete_button"
    @click="deleteAllTodoList">
    전체 삭제
  </button>
  <button
    class="finish_delete_button"
    @click="deleteFinishTodoList">
    완료 목록 삭제
  </button>
</template>

<script>
export default {
  methods: {
    async deleteFinishTodoList() {
      await this.$store.dispatch('deleteFinishTodoList')
      this.$store.dispatch('readTodoList')
    },
    async deleteAllTodoList() {
      await this.$store.dispatch('deleteAllTodoList')
      this.$store.dispatch('readTodoList')
    }
  }
}
</script>

<style lang="scss" scoped>
.all_delete_button, .finish_delete_button {
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background-color: transparent;
  border: 2px solid #ff0000;
  border-radius: 10px;
  &:hover {
    color: white;
    background-color: #ff0000; 
  }
}
</style>
