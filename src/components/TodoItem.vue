<template>
  <h3>{{ title }}</h3>
  <button
    :value="title">
    수정
  </button>
  <button
    :value="title">
    삭제
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
