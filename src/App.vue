<template>
  <CreateTodo />
  <ToDoList />
</template>

<script>
import CreateTodo from '~/components/CreateTodo.vue'
import ToDoList from '~/components/ToDoList.vue'

export default {
  // 지역적으로 사용할 컴포넌트를 등록
  components: {
    // 속성과 데이터의 이름이 같으면 하나로 합칠 수 있다.
    ToDoList,
    CreateTodo
  }
}
</script>

<style>
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('./img/background.png');
    background-repeat: no-repeat;
    /* background-position: center; */
    background-size: auto;
  }
</style>
