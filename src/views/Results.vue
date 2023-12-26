<script setup>

import {useRouter} from "vue-router";
import WideButton from "@/components/Inputs/WideButton.vue";

const props = defineProps([
  "results",
  "canPass"
])

if (props.canPass === undefined || props.canPass.v === false) {
  useRouter().push('/');
}

props.canPass.v = false;

</script>

<template>
  <div class="results">
    <div>
      <img src="/images/win.png"/>
      <h1>{{ results.winner === "Tie" ? "Well... that's awkward..." : `Congrats, ${results.winner} !` }}</h1>
    </div>
    <div>
      <div>
        <img src="/icons/winner.png"/>
        <p>Winner</p>
        <h1>{{ results.winner }}</h1>
      </div>
      <div>
        <img src="/icons/reason.png"/>
        <p>Reason</p>
        <h1>{{ results.reason }}</h1>
      </div>
      <div>
        <img src="/icons/timer.png"/>
        <p>Timer</p>
        <h1>{{ results.timer }} s</h1>
      </div>
      <div>
        <img src="/icons/wlps.png"/>
        <p>Winner's LPs</p>
        <h1>{{ results.wlps }}</h1>
      </div>
      <div>
        <img src="/icons/llps.png"/>
        <p>Loser's LPs</p>
        <h1>{{ results.llps }}</h1>
      </div>
      <div>
        <img src="/icons/ratio.png"/>
        <p>Ratio</p>
        <h1>{{ results.ratio }}</h1>
      </div>
    </div>
    <WideButton
        img-link="/icons/back.png"
        shown-title="Restart"
        @update:buttonClicked="$router.push('/')"/>
  </div>
</template>

<style scoped>
@media screen and (hover: hover) {
  .results {
    position: fixed;
    padding: 64px 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 32px;
    overflow: scroll;
    animation: FadeAnimation ease-out 1s;
  }

  .results > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: center;
    gap: 16px;
  }

  .results > div:nth-child(1) > * {
    margin: 0;
  }

  .results > div:nth-of-type(1) > h1 {
    max-width: 600px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .results > div:nth-child(1) > img {
    height: 160px;
    width: 160px;
    margin: 0 auto;
  }

  .results > div:nth-of-type(2) {
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  .results > div:nth-of-type(2) > div {
    background: var(--widget);
    padding: 24px;
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;
    gap: 8px;
    width: 256px;
    box-shadow: var(--shadow);
  }

  .results > div:nth-of-type(2) > div:hover {
    background: var(--hover);
  }

  .results > div:nth-of-type(2) > div > * {
    margin: 0;
  }

  .results > div:nth-of-type(2) > div > p {
    opacity: 0.5;
  }

  .results > div:nth-of-type(2) > div > h1 {
    max-width: 250px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .results > div:nth-of-type(2) > div > img {
    height: 32px;
  }
}

@media screen and (hover: none) {
  .results {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 24vw 6vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 12vw;
    overflow: scroll;
    animation: FadeAnimation ease-out 1s;
  }

  .results > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: center;
    gap: 4vw;
  }

  .results > div:nth-child(1) > * {
    margin: 0;
  }

  .results > div:nth-of-type(1) > h1 {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .results > div:nth-child(1) > img {
    height: 40vw;
    width: 40vw;
    margin: 0 auto;
  }

  .results > div:nth-of-type(2) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 4vw;
  }

  .results > div:nth-of-type(2) > div {
    background: var(--widget);
    padding: 6vw;
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;
    gap: 2vw;
    box-shadow: var(--shadow);
  }

  .results > div:nth-of-type(2) > div:active {
    background: var(--hover);
  }

  .results > div:nth-of-type(2) > div > * {
    margin: 0;
  }

  .results > div:nth-of-type(2) > div > p {
    opacity: 0.5;
  }

  .results > div:nth-of-type(2) > div > h1 {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .results > div:nth-of-type(2) > div > img {
    height: 10vw;
  }
}

</style>