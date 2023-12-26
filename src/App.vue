<script setup>
import {ref} from "vue";


const setup = ref({
  p1name: "",
  p2name: "",
  lps: 8000,
  timertype: "0",
  countdown: 120,
  ptime: 200,
  atime: 10
})

const results = ref({
  winner: "",
  reason: "",
  wlps: 8000,
  llps: 0,
  ratio: 1,
  timer: 0
})

const pass = ref({v: false});
</script>

<template>
  <RouterView :canPass="pass" :results="results" :setup="setup"/>
</template>

<style scoped>
</style>