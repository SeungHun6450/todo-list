<template>
  <div
    v-if="loading"
    class="loading">
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.loading
    }
  }
}
</script>

<style scoped>
.loading {
  width: 100px;
  height: 100px;
  position: absolute;
  margin-top: 50px;
  margin-left: 225px;
  display: block;
  background-image: url('../img/loading.gif');
  background-repeat: no-repeat;
  background-size: 100px;
}
</style>
