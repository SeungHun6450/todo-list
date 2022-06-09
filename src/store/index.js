import { createStore } from 'vuex'
import axios from 'axios'
// import Sortable from 'sortablejs'

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
      const res = await axios({
        url: END_POINT,
        method: 'GET',
        headers
      })
      let order = res.data.length
      await axios({
        url: END_POINT,
        method: 'POST',
        headers,
        data: {
          title,
          order
        }
      })
    },
    // context 매개변수 중(state, getters, commit, dispatch) 객체 구조분해할당으로 commit만 꺼내서 사용
    async readTodoList({ commit }, done) {
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
    },
    async deleteFinishTodoList() {
      const res = await axios({
        url: END_POINT,
        method: 'GET',
        headers
      })
      
      for(let i = 0 ; i < res.data.length ; i += 1) {
        if(res.data[i].done === true){
          let deleteID = res.data[i].id
          let END_POINT_DELETE = `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${deleteID}`
          await axios({
            url: END_POINT_DELETE,
            method: 'DELETE',
            headers
          })
        }
      }
    },
    async deleteAllTodoList() {
      const res = await axios({
        url: END_POINT,
        method: 'GET',
        headers
      })
      
      for(let i = 0 ; i < res.data.length ; i += 1) {
        let deleteID = res.data[i].id
        let END_POINT_DELETE = `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${deleteID}`
        await axios({
          url: END_POINT_DELETE,
          method: 'DELETE',
          headers
        })
      }
    },
    // initSortable() {
    //   new Sortable(this.$refs.todoList, {
    //     handle: 'li .handle', // 드래그 핸들이 될 요소의 선택자를 입력합니다.
    //     delay: 50, // 클릭이 밀리는 것을 방지하기 위해 약간의 지연 시간을 추가합니다.
    //     animation: 0, // 정렬할 때 애니메이션 속도(ms)를 지정합니다.
    //     forceFallback: true, // 다양한 환경의 일관된 Drag&Drop(DnD)을 위해 HTML5 기본 DnD 동작을 무시하고 내장 기능을 사용합니다.
    //     // 요소의 DnD가 종료되면 실행할 핸들러(함수)를 지정합니다.
    //     onEnd: event => {
    //       console.log(event)
    //       this.reorderTodos(event.oldIndex, event.newIndex)
    //     }
    //   })
    // }
  }
})
