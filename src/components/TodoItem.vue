<template>
  <li>
    <template v-if="!editMode">
      <input
        class="chk"
        type="checkbox"
        :checked="done"
        @click="changeDoneTodoList" />
      <h3>{{ title }}</h3>
      <div class="update">
        수정일: {{ new Date(updatedAt).toLocaleString() }}
      </div>
      <button
        class="edit_button"
        @click="onEditMode">
        &#128221;
      </button>
      <button
        class="delete_button"
        @click="deleteTodoList">
        &#10060;
      </button>
    </template>
    <template v-else>
      <input
        ref="titleInput"
        class="edit_title"
        :value="title" 
        @keydown.enter="updateTodoList(), offEditMode()"
        @keydown.esc="offEditMode" />
      <button
        class="edit_ok_button"
        @click="updateTodoList(), offEditMode()">
        &#9989;
      </button>
      <button
        class="cancel_button"
        @click="offEditMode">
        &#10062;
      </button>
    </template>
    <div class="create">
      생성일: {{ new Date(createdAt).toLocaleString() }}
    </div>
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
      await this.$nextTick()
      this.$refs.titleInput.focus()
    },
    offEditMode() {
      this.editMode = false
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  display: flex;
  margin-left: 10px;
  margin-bottom: 5px;
  width: 509px;
  content: '';
  border:#dbd9d9 solid 0.1px;
  background-color: #dbd9d9;
  border-radius: 5px;
      &:hover {
    .update {
      display: block;
    }
  }
  h3 {
    top: 0;
    left: 0;
    margin: auto;
    padding-left: 5px;
    text-decoration: none;
    overflow: hidden;
    width: auto;
  }
  .create{
    font-size: 14px;
    font-weight: bold;
    margin-right: 7px;
    width: 85px;
  }
  .update{
    font-size: 14px;
    font-weight: bold;
    width: 100px;
    display: none;
  }
  .edit_button, .delete_button, .edit_ok_button, .cancel_button {
    background-color: transparent;
    border: none;
    top: 0;
    left: 0;
    font-size: 20px;
  }
  .edit_ok_button, .cancel_button {}
  .edit_title {
    width: 330px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  .chk {
    width: 22px;
    height: 22px;
    top: 0;
    left: 0;
    margin: auto;
    margin-left: 5px;
  }
  :checked {

    & + h3 {
      text-decoration:line-through;
    }
  }
}
</style>
