<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";
import {ref} from "vue";

axios.defaults.headers.common['Authorization-Type'] = 'apikey'
axios.defaults.headers.common['X-APISpace-Token'] = '0yktydic3coymz8fdq6xv3vvphoeetti'
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
async function getTheWeather() {
  const res = await axios.get(import.meta.env.VITE_SOME_API)
  console.log(res)
}
getTheWeather()
function getImageUrl(name:string) {
  return new URL(`./assets/images/${name}`, import.meta.url).href
}
const name =ref('/src/assets/images/3.jpg')
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <img :src="getImageUrl('2.jpg')">
  <img :src="getImageUrl('3.jpg')">
  <img :src="getImageUrl('4.png')" style="width: 400px;height: 400px">
  <HelloWorld msg="Vite + Vue" />
  <el-button type="primary">test</el-button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
