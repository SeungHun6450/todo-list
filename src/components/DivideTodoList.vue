<template>
  <select
    name="done"
    @change="selectReadTodoList">
    <option value="">
      전체
    </option>
    <option value="true">
      완료
    </option>
    <option value="false">
      미완료
    </option>
  </select>
</template>

<script>
export default {
  methods: {
    selectReadTodoList(event) {
      const done = event.target.value
      this.$store.dispatch('readTodoList', done)
      this.$store.dispatch('deleteFinishButton', done)
    }
  }
}
</script>

<style lang="scss" scoped>
  select {
    height: 30px;
    margin-left: 10px;
    margin-right: 40%;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5px;
  }
</style>
