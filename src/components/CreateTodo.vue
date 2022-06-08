<template>
  <div>
    <input
      :value="title"
      placeholder="To Do List를 입력하세요!"
      @input="title = $event.target.value" 
      @keydown.enter="createTodoList()" />
    <button @click="createTodoList()">
      &#9997;
    </button>
  </div>
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

<style lang="scss" scoped>
  div {
    position: relative;
    margin: 5% 0 15px 20%;
    input {
      padding: 0 10px;
      height: 30px;
      width: 300px;
      font-size: 22px;
      border-radius: 10px;
    }
    button {
      left: 65%;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      background-color: transparent;
      border-style: none;
      position: absolute;
    }
  }
</style>
