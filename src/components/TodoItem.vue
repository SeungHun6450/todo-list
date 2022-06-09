<template>
  <li>
    <template v-if="!editMode">
      <div class="handle">
      </div>
      <input
        class="chk"
        type="checkbox"
        :checked="done"
        @click="changeDoneTodoList" />
      <div class="title_and_buttons">
        <div class="title">
          {{ title }}
          <template v-if="new Date(createdAt).toLocaleString() !== new Date(updatedAt).toLocaleString()">
            <div class="update">
              수정일: {{ new Date(updatedAt).toLocaleString() }}
            </div>
          </template>
        </div>
        <div class="buttons">
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
        </div>
      </div>
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
  .handle {
    background-image: url('../img/baseline_menu_black_24dp.png');
    margin: auto -10px auto 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .chk {
    width: 22px;
    height: 22px;
    top: 0;
    margin: auto;
    &:checked {
      & + .title_and_buttons .title {
        text-decoration: line-through;
        .update  {
          display: none;
        }
      }
      & + .title_and_buttons .buttons .edit_button {
        display: none;
      }
    }
  }
  .title_and_buttons {
    top: 0;
    margin: auto;
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      display: flex;
      align-items: center;
      font-size: 22px;
      font-weight: bold;
      margin-left: -20px;
      .update {
        margin-left: 5px;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        display: none;
      }
      &:hover {
        .update {
          display: block;
        }
      }      
    }
    .buttons {
      display: flex;
      margin-right: -30px;
      .edit_button, .delete_button {
        background-color: transparent;
        border: none;
        top: 0;
        right: 0;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .edit_ok_button, .cancel_button {
    background-color: transparent;
    border: none;
    top: 0;
    left: 0;
    font-size: 20px;
    cursor: pointer;
  }
  .edit_title {
    width: 330px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  .create{
    top: 0;
    right: 0;
    margin: auto;
    font-size: 14px;
    font-weight: bold;
    margin-right: 7px;
    width: 85px;
  }
}
</style>
