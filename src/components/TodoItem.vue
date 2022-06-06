<template>
  <li>
    <template v-if="!editMode">
      <input
        class="chk"
        type="checkbox"
        :checked="done"
        @click="changeDoneTodoList" />
      <h3>{{ title }}</h3>
      <button
        @click="onEditMode">
        수정
      </button>
      <button
        @click="deleteTodoList">
        삭제
      </button>
    </template>
    <template v-else>
      <input
        ref="titleInput"
        :value="title" 
        @keydown.enter="updateTodoList(), offEditMode()"
        @keydown.esc="offEditMode" />
      <button
        @click="updateTodoList(), offEditMode()">
        완료
      </button>
      <button
        @click="offEditMode">
        취소
      </button>
    </template>
    <h5>생성일: {{ new Date(createdAt).toLocaleString() }}</h5>
    <template v-if="(new Date(createdAt).toLocaleString()) !== (new Date(updatedAt).toLocaleString())">
      <h5>수정일: {{ new Date(updatedAt).toLocaleString() }}</h5>
    </template>
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
      await this.$store.dispatch('updateTodoList', payload)
      this.$store.dispatch('readTodoList')
    },
    async deleteTodoList() {
      await this.$store.dispatch('deleteTodoList', this.id)
      this.$store.dispatch('readTodoList')
    },
    async changeDoneTodoList(event) {
      let doneValue = false
      if (event.target.checked) {
        doneValue = true
      } 
      const payload = { id: this.id, title: this.title, done: this.done, order: this.order}
      payload.done = doneValue
      await this.$store.dispatch('updateTodoList', payload)
      this.$store.dispatch('readTodoList')
    },
    async onEditMode() {
      this.editMode = true
      console.log(window)
      // window.addEventListener('click', this.offEditMode)
      await this.$nextTick()
      this.$refs.titleInput.focus()
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
  text-decoration: none;
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
.chk {
  margin-top: 8px;
}
:checked + h3 {
  text-decoration:line-through;
}
</style>
