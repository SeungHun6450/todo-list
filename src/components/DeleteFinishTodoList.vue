<template>
  <button
    @click="deleteFinishTodoList">
    완료 된 목록 삭제
  </button>
</template>

<script>
export default {
  methods: {
    async deleteFinishTodoList() {
      await this.$store.dispatch('deleteFinishTodoList')
      this.$store.dispatch('readTodoList')
    }
  }
}
</script>
