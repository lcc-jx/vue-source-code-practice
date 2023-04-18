import { createStore } from 'vuex'

export default createStore({
  state(){
    return {
      count:0,
      message:'please try'
    }
  },
  mutations: {
    increament(state){
      console.log(111);
      state.count++
    }
  }
})
