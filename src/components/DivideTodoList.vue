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
    }
  }
}
</script>
