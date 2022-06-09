<template>
  <HeaderVue />
  <CreateTodo />
  <div class="divide_delete">
    <DivideTodoList />
    <DeleteAllTodoList />
  </div>
  <LoadingImage />
  <ToDoList />
</template>

<script>
import HeaderVue from '~/components/HeaderVue.vue'
import CreateTodo from '~/components/CreateTodo.vue'
import DivideTodoList from '~/components/DivideTodoList.vue'
import DeleteAllTodoList from '~/components/DeleteAllTodoList.vue'
import LoadingImage from '~/components/LoadingImage.vue'
import ToDoList from '~/components/ToDoList.vue'

export default {
  // 지역적으로 사용할 컴포넌트를 등록
  components: {
    // 속성과 데이터의 이름이 같으면 하나로 합칠 수 있다.
    HeaderVue,
    ToDoList,
    DivideTodoList,
    DeleteAllTodoList,
    LoadingImage,
    CreateTodo
  }
}
</script>

<style>
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('./img/background_height.png');
    background-repeat: no-repeat;
    background-position: center;
    height: 827px;
    background-size: auto;
  }
</style>
