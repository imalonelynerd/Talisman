<script setup>

import WideButton from "@/components/Inputs/WideButton.vue";
import {ref} from "vue";

const props = defineProps([
  "time",
  "timeo",
  "type"
])

const emits = defineEmits(["update:timerEnded"]);

function timeToMMSS(t) {
  if (t === "---") {
    return "--:--"
  }
  let s = t % 60;
  let m = Math.floor(t / 60) % 60;
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`
}

function startTimer() {

  let chronometer = function () {
    props.timeo.stop = setInterval(function () {
      props.timeo.t -= -1;
    }, 1000);
  }

  let timer = function () {
    props.timeo.stop = setInterval(function () {
      if (props.timeo.t === 0) {
        emits("update:timerEnded");
        resetTimer();
      }
      props.timeo.t -= 1
    }, 1000);
  }

  switch (props.type) {
    case "0":
      chronometer();
      break;
    case "1":
      timer();
      break;
  }
  props.timeo.running = true;
}


function resetTimer() {
  pauseTimer();
  props.timeo.t = props.time;
}


function pauseTimer() {
  clearInterval(props.timeo.stop);
  props.timeo.stop = -1;
  props.timeo.running = false;
}
</script>

<template>
  <div class="timer">
    <h1>{{ timeo.t }}</h1>
    <p>{{ timeToMMSS(timeo.t) }}</p>
    <div>
      <WideButton
          @update:buttonClicked="$router.push('/')"
          shown-title=""
          img-link="/icons/back.png"
      />
      <WideButton
          :is-disabled="type === '2'"
          @update:buttonClicked="resetTimer()"
          shown-title=""
          img-link="/icons/reset.png"
      />
      <WideButton
          :is-disabled="type === '2'"
          @update:buttonClicked="timeo.running ? pauseTimer() : startTimer()"
          shown-title=""
          :is-important="type !== '2'"
          :img-link="timeo.running ? '/icons/pause.png' : '/icons/start.png'"
      />
    </div>
  </div>
</template>

<style scoped>
@media screen and (orientation: landscape) {
  .timer {
    padding: 24px;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }

  .timer > * {
    margin: 0;
    text-align: center;
  }

  .timer > div {
    display: flex;
    flex-direction: row;
    align-self: center;
    justify-content: center;
    gap: 8px;
  }
}
</style>