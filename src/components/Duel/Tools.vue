<script setup>

import {ref} from "vue";

const dicer = ref({
  img: "/tools/dice.png",
  value: "Roll",
  clickable: true
})

const coinr = ref({
  img: "/tools/coin.png",
  value: "Flip",
  clickable: true
})

function rollDice() {
  let resetDice = function () {
    dicer.value.value = "Roll";
    dicer.value.clickable = true;
  }

  let res = Math.floor(Math.random() * 6) + 1;
  dicer.value.img = `/tools/d${res}.png`
  dicer.value.value = "" + res;
  dicer.value.clickable = false;
  setTimeout(resetDice, 1000);
}

function tossCoin() {
  let resetCoin = function () {
    coinr.value.value = "Flip";
    coinr.value.clickable = true;
  }
  let res = Math.floor(Math.random() * 2);
  switch (res) {
    case 0:
      coinr.value.img = "tools/cp.png";
      coinr.value.value = "Tails"
      break;
    case 1:
      coinr.value.img = "tools/cf.png";
      coinr.value.value = "Head"
      break;
  }
  coinr.value.clickable = false;
  setTimeout(resetCoin, 1000);
}
</script>

<template>
  <div class="tools">
    <div @click="dicer.clickable ? rollDice() : ''">
      <img
          :src="dicer.img"
          :style="`opacity : ${dicer.clickable ? 1 : 0.5}`"
      />
      <p>{{ dicer.value }}</p>
    </div>
    <div @click="coinr.clickable ? tossCoin() : ''">
      <img
          :src="coinr.img"
          :style="`opacity : ${coinr.clickable ? 1 : 0.5}`"
      />
      <p>{{ coinr.value }}</p>
    </div>
  </div>
</template>

<style scoped>
@media screen and (hover: hover) {
  .tools {
    padding: 24px;
    background: var(--bg);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    gap: 12px;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }

  .tools > div {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    justify-content: center;
    gap: 8px;
    background: var(--widget);
    border-radius: var(--radius-button);
    box-shadow: var(--shadow);
    padding: 16px;
  }

  .tools > div:hover {
    background: var(--hover);
  }

  .tools > div > * {
    margin: 0 auto;
    font-weight: bold;
  }

  .tools > div > p {
    width: 92px;
    text-align: center;
  }

  .tools > div > img {
    height: 48px;
  }
}

@media screen and (hover: none) {
  .tools {
    padding: 6vw;
    background: var(--bg);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    gap: 4vw;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }

  .tools > div {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-self: stretch;
    justify-content: center;
    gap: 2vw;
    background: var(--widget);
    border-radius: var(--radius-button);
    box-shadow: var(--shadow);
    padding: 4vw 0;
  }

  .tools > div:active {
    background: var(--hover);
  }

  .tools > div > * {
    margin: 0 auto;
    font-weight: bold;
  }

  .tools > div > p {
    width: 30vw;
    text-align: center;
  }

  .tools > div > img {
    height: 14vw;
  }
}
</style>