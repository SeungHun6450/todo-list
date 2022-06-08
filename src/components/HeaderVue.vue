<template>
  <div class="all">
    <div class="title">
      To Do List
    </div>
    <div class="date">
      <strong>{{ new Date().toLocaleDateString() }}</strong>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
 .all{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px; 
  .title{
    font-size: 35px;
    font-weight: bold;
    color:#d567ce;
  }
  .date {
    font-size: 25px;
    color: #d567ce;
  }
 }
</style>
