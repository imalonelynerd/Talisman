<script setup>

import {ref} from "vue";

defineProps([
  "bgImg"
])

const pos = ref("0");

(function () {
  document.addEventListener("mousemove", parallax);

  function parallax(e) {
    let _w = window.innerWidth / 2;
    let _h = window.innerHeight / 2;
    let _mouseX = e.clientX;
    let _mouseY = e.clientY;
    let _depth = `${50 - (_mouseX - _w) * 0.033}% ${50 - (_mouseY - _h) * 0.033}%`;
    pos.value = `${_depth}`;
  }

})();

</script>

<template>
  <div v-if="bgImg !== undefined"
       :style="`background : url('${bgImg}'); background-position: ${pos}`"
       class="background"
  />
  <div v-if="bgImg !== undefined"
       :style="`background : url('${bgImg}')`"
       class="mbackground"
  />
</template>

<style scoped>
@media screen and (hover: hover) {
  .background {
    position: relative;
    width: 100%;
    height: 100vh;
    background-size: 110% !important;
    background-repeat: no-repeat;
    background-position: center center;
    z-index: 0;
    animation: ParaAnimation ease-out 0.75s;
  }

  .mbackground {
    display: none;
  }
}

@media screen and (hover: none) {
  .background {
    display: none;
  }

  .mbackground {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-repeat: no-repeat;
    background-position: center center;
    animation: ParaAnimation ease-out 0.75s;
  }
}

</style>