<template>
  <input
    :value="title"
    @input="title = $event.target.value"
    @keydown.enter="createTodoList()" />
  <button @click="createTodoList()">
    추가
  </button>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    }
  },
  methods: {
    async createTodoList() {
      if (!this.title.trim()) return alert('추가할 리스트를 입력해주세요!')
      // store에 있는 action메소드 실행
      await this.$store.dispatch('createTodoList', this.title)
      this.title = ''
      this.$store.dispatch('readTodoList')
    }
  }
}
</script>
