<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <h2>count:{{ count }}</h2>
    <h2>doubleCount:{{ doubelC }}</h2>
    <button @click="increment">点击加store.count</button>
    <button @click="decrement(n)">点击store.count 减 {{ n }}</button>
  </div>
</template>

<script setup>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useStore } from 'vuex'
const store = useStore()
const count  = computed(() => store.state.count)
const doubelC = computed(() => store.getters.doubleCount)
const n = ref(2)
function increment() {
  store.commit('increment')
  console.log(store.state.count)
}
function decrement(n,b){
  console.log(n,b);
  store.commit('decrement', n)
}
</script>
