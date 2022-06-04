import { createStore } from 'vuex'
import axios from 'axios'

const END_POINT = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos'
const headers = {
  'Content-Type': 'application/json',
  apikey: 'FcKdtJs202204',
  username: 'KDT2_ByeonSeungHun'
}

export default createStore({
  // state는 계산된 데이터(computed)에서 가져올수 있다.
  state() {
    return {
      todos: []
    }
  },
  // todos에 대한 수정 권한
  // payload는 서버에서 가지고 온 todos
  mutations: {
    setTodos(state, payload) {
      state.todos = payload
    }
  },
  actions: {
    async createTodoList(context, title) {
      await axios({
        url: END_POINT,
        method: 'POST',
        headers,
        data: {
          title
        }
      })
    },
    // context 매개변수 중(state, getters, commit, dispatch) 객체 구조분해할당으로 commit만 꺼내서 사용
    async readTodoList({ commit }) {
      const res = await axios({
        url: END_POINT,
        method: 'GET',
        headers
      })
      // commit()메소드로 mutaion에 있는 setTodos라는 변이 메소드를 실행, 
      commit('setTodos', res.data)
    },
    async updateTodoList(context, payload) {
      const id = payload.id
      const title =  payload.title
      const done = payload.done
      const order = payload.order
      const END_POINT_UPDATE = `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`
      await axios({
        url: END_POINT_UPDATE,
        method: 'PUT',
        headers,
        data: {
          title,
          done,
          order
        }
      })
    },
    async deleteTodoList(context, id) {
      const deleteID = id
      const END_POINT_DELETE = `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${deleteID}`
      await axios({
        url: END_POINT_DELETE,
        method: 'DELETE',
        headers
      })
    }
  }
})
