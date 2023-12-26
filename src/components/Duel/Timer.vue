<script setup>

import WideButton from "@/components/Inputs/WideButton.vue";

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
          img-link="/icons/back.png"
          shown-title=""
          @update:buttonClicked="$router.push('/')"
      />
      <WideButton
          :is-disabled="type === '2'"
          img-link="/icons/reset.png"
          shown-title=""
          @update:buttonClicked="resetTimer()"
      />
      <WideButton
          :img-link="timeo.running ? '/icons/pause.png' : '/icons/start.png'"
          :is-disabled="type === '2'"
          :is-important="type !== '2'"
          shown-title=""
          @update:buttonClicked="timeo.running ? pauseTimer() : startTimer()"
      />
    </div>
  </div>
</template>

<style scoped>
@media screen and (hover: hover) {
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

@media screen and (hover: none) {
  .timer {
    padding: 6vw;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4vw;
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
    gap: 2vw;
  }
}
</style>