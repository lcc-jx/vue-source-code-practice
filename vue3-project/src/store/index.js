import { createStore } from 'vuex'

export default createStore({
  state(){
    return {
      count:0
    }
  },
  getters: {
    doubleCount(state){
      return state.count * 2
    }
  },
  mutations: {
    increment(state){
      console.log('增加咯');
      state.count++
    },
    decrement(state, n){
      console.log('减少咯');
      state.count -= n
    }
  },
  actions: {
  },
  modules: {
  }
})
