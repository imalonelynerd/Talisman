<script setup>

import WideButton from "@/components/Inputs/WideButton.vue";
import {ref} from "vue";
import NumberInput from "@/components/Inputs/NumberInput.vue";

defineEmits([
  "update:calcClosed",
  "update:valueUpdated"
])

const props = defineProps([
  "ogValue",
  "hist"
])

const ope = ref(1);
const nb2 = ref(0);
const res = ref(0);
computeOpe(props.ogValue, ope.value, nb2.value);

const opeMap = {
  0: "+",
  1: "-",
  2: "*",
  3: "/",
  4: "→"
}

function computeOpe(nb1, ope, nb2) {
  switch (ope) {
    case 0:
      res.value = nb1 - (-nb2);
      break;
    case 1:
      let a = nb1 - nb2
      res.value = a < 0 ? 0 : a;
      break;
    case 2:
      res.value = nb1 * nb2
      break;
    case 3:
      res.value = nb2 === '0' || nb2 === 0 ? 0 : Math.floor(nb1 / nb2)
      break;
    case 4:
      res.value = nb2;
      break;
  }
}

function removeNumber() {
  nb2.value = nb2.value.toString().length === 1 ? "0" : Math.floor(nb2.value / 10);
  computeOpe(props.ogValue, ope.value, nb2.value);
}

function inputNumber(nb) {
  if (nb2.value === 0) {
    nb2.value = nb;
    computeOpe(props.ogValue, ope.value, nb2.value);
    return;
  }
  nb2.value = nb2.value * 10 + nb;
  computeOpe(props.ogValue, ope.value, nb2.value);
}

function changeOpe(oper) {
  ope.value = oper;
  computeOpe(props.ogValue, ope.value, nb2.value);
}
</script>

<template>
  <div class="calc">
    <div class="screen">
      <h2>{{ ogValue }}</h2>
      <h3>{{ opeMap[ope] }}</h3>
      <NumberInput
          place-holder=""
          :custom-value="nb2"
          :min-value="0"
          :max-value="999999"
          :number-step="1"
          :no-numbers="true"
          @update:valueUpdated="args => {nb2 = args; computeOpe(ogValue, ope, nb2)}"
      />
      <h3>=</h3>
      <h1 :style="`color : ${res <= 0 ? 'var(--red)' : 'var(--text)'}`">{{ res }}</h1>
    </div>
    <div class="opes">
      <WideButton
          @update:buttonClicked="changeOpe(0)"
          shown-title="+"
          img-link=""
      />
      <WideButton
          @update:buttonClicked="changeOpe(1)"
          shown-title="-"
          img-link=""
      />
      <WideButton
          @update:buttonClicked="changeOpe(2)"
          shown-title="*"
          img-link=""
      />
      <WideButton
          @update:buttonClicked="changeOpe(3)"
          shown-title="/"
          img-link=""
      />
      <WideButton
          @update:buttonClicked="changeOpe(4)"
          shown-title="→"
          img-link=""
      />
    </div>
    <div class="kb">
      <WideButton v-for="e in [1,2,3,4,5,6,7,8,9]"
                  :shown-title="e" img-link=""
                  @update:buttonClicked="inputNumber(e)"/>
      <WideButton
          @update:buttonClicked="removeNumber"
          shown-title=""
          img-link="/icons/back.png"
      />
      <WideButton
          @update:buttonClicked="inputNumber(0)"
          shown-title="0"
          img-link=""
      />
      <WideButton
          @update:buttonClicked="
              hist.push(`${ogValue} ${opeMap[ope]} ${nb2} = ${res}`);
              $emit('update:valueUpdated', res)"
          shown-title=""
          :is-important="true"
          img-link="/icons/enter.png"
      />
    </div>
  </div>
  <div class="calc-container" @click="$emit('update:calcClosed')"></div>

</template>

<style scoped>

@media screen and (orientation: landscape) {
  .calc-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: color-mix(in srgb, var(--bg), transparent 50%);
    z-index: 4;
    animation: BgAnimation ease-out 0.25s;
  }

  .calc {
    z-index: 5;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 350px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 32px;
    background: var(--bg);
    animation: SlideAnimation ease-out 0.25s;
    padding: 64px;
  }

  .screen {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .screen > * {
    margin: 0;
  }

  .screen > h3 {
    opacity: 0.5;
  }

  .screen > h2 {
    font-size: 2em;
    opacity: 0.75;
  }

  .screen > h1 {
    font-size: 3em;
  }

  .nbinput {
    width: 128px;
    overflow: hidden;
  }

  .opes {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    gap: 8px;
  }

  .opes > * {
    flex-grow: 1;
  }

  .kb {
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .kb > * {
    padding: 28px 0;
    font-size: 1.25em;
  }
}

</style>