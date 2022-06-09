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
      todos: [],
      order: '',
      loading: false
    }
  },
  // todos에 대한 수정 권한
  // payload는 서버에서 가지고 온 todos
  mutations: {
    setTodos(state, payload) {
      state.todos = payload
    },
    reorderTodos(state, {oldIndex, newIndex}) {
      const clone = { ...state.todos[oldIndex] }
      state.todos.splice(oldIndex, 1)
      state.todos.splice(newIndex, 0, clone)
    },
    loadingStatus(state, status = true) {
      state.loading = status
    }
  },
  actions: {
    async createTodoList({commit}, title) {
      commit('loadingStatus')
      const res = await axios({
        url: END_POINT,
        method: 'GET',
        headers
      })

      let order = 0
      let max_order = 0
      for(let i = 0 ; i < res.data.length ; i += 1) {
        order = res.data[i].order + 1
        if(order > max_order) {
          max_order = order
        }
      }
    
      await axios({
        url: END_POINT,
        method: 'POST',
        headers,
        data: {
          title,
          order: max_order
        }
      })
      commit('loadingStatus', false)
    },
    // context 매개변수 중(state, getters, commit, dispatch) 객체 구조분해할당으로 commit만 꺼내서 사용
    async readTodoList({ commit }, done) {
      commit('loadingStatus')
      const res = await axios({
        url: END_POINT,
        method: 'GET',
        headers
      })

      // done에 따른 새로운 객체 데이터를 생성하여 목록에 출력하기
      if(done === 'true' || done === 'false') {

        let divideData = []
        let count = 0

        for(let i = 0 ; i < res.data.length ; i += 1) {
          if(String(res.data[i].done) === done){
            divideData[count] = res.data[i]
            count += 1
          }
        }

        commit('setTodos', divideData)
      }
      else {
        // 전체 목록
        // commit()메소드로 mutaion에 있는 setTodos라는 변이 메소드를 실행, 
        commit('setTodos', res.data)
      }
      commit('loadingStatus', false)
    },
    async updateTodoList(context, payload) {
      const id = payload.id
      const title =  payload.title
      const done = payload.done
      const order = payload.order
      const END_POINT_UPDATE = END_POINT + '/' + id
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
    async deleteTodoList({commit}, id) {
      commit('loadingStatus')
      const deleteID = id
      const END_POINT_DELETE = END_POINT + '/' + deleteID
      await axios({
        url: END_POINT_DELETE,
        method: 'DELETE',
        headers
      })
      commit('loadingStatus', false)
    },
    async deleteFinishTodoList({commit}) {
      commit('loadingStatus')
      const res = await axios({
        url: END_POINT,
        method: 'GET',
        headers
      })
      
      for(let i = 0 ; i < res.data.length ; i += 1) {
        if(res.data[i].done === true){
          let deleteID = res.data[i].id
          let END_POINT_DELETE = END_POINT + '/' + deleteID
          await axios({
            url: END_POINT_DELETE,
            method: 'DELETE',
            headers
          })
        }
      }
      commit('loadingStatus', false)
    },
    async deleteAllTodoList({commit}) {
      commit('loadingStatus')
      const res = await axios({
        url: END_POINT,
        method: 'GET',
        headers
      })
      
      for(let i = 0 ; i < res.data.length ; i += 1) {
        let deleteID = res.data[i].id
        let END_POINT_DELETE = END_POINT + '/' + deleteID
        await axios({
          url: END_POINT_DELETE,
          method: 'DELETE',
          headers
        })
      }
      commit('loadingStatus', false)
    },
    async reorderTodo({commit, state}, event) {
      if (event !== undefined) {
        commit('reorderTodos', event)
      }
      const todoIds = state.todos.map(todo => todo.id)
      let END_POINT_REORDER = END_POINT + '/reorder'
      await axios({
        url: END_POINT_REORDER,
        method: 'PUT',
        headers,
        data: {
          todoIds
        }
      })
    }
  }
})
