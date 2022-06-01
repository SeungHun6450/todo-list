<template>
  <li>
    <template v-if="!editMode">
      <h3>{{ title }}</h3>
      <button
        @click="onEditMode">
        수정
      </button>
      <button
        :value="id"
        @click="deleteTodoList">
        삭제
      </button>
    </template>
    <template v-else>
      <input
        ref="titleInput"
        :value="title" 
        @keydown.enter="offEditMode()"
        @keydown.esc="offEditMode" />
      <button
        :value="id"
        @click="offEditMode()">
        완료
      </button>
      <button
        @click="offEditMode">
        취소
      </button>
    </template>
    <h5>생성일: {{ new Date(createdAt).toLocaleString() }}</h5>
    <h5>수정일: {{ new Date(updatedAt).toLocaleString() }}</h5>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    done: {
      type: Boolean,
      default: false
    },
    order:{
      type: Number,
      default: 0
    },
    createdAt: {
      type: String,
      default: ''
    },
    updatedAt:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editMode: false
    }
  },
  methods: {
    async updateTodoList() {
      const payload = { id: this.id, title: this.$refs.titleInput.value, done: this.done, order: this.order}
      this.$store.dispatch('updateTodoList', payload)
    },
    async deleteTodoList() {
      this.$store.dispatch('deleteTodoList', this.id)
    },
    onEditMode() {
      this.editMode = true
      console.log(this.$refs.titleInput)
      // window.addEventListener('click', this.offEditMode)
      // this.$refs.titleInput.focus()
    },
    offEditMode() {
      this.editMode = false
      // window.removeEventListener('click', this.offEditMode)
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  margin: 0 10px 20px 0;
}
h5{
  margin: 5px 10px 20px 10px;
}
li {
  display: flex;
}
button {
  width: 50px;
  height: 27px;
}

</style>
