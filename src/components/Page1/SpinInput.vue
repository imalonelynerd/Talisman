<script setup>
import {ref} from "vue";

const props = defineProps(
    [
      'defaultValue',
      'minValue',
      'maxValue',
      'stepValue',
      'spinPH',
      'notStacked']
)

const spinValue = ref(parseInt(props.defaultValue));
if (isNaN(spinValue.value)) {
  spinValue.value = props.minValue;
}

function add(isneg) {
  if (spinValue.value >= props.minValue && spinValue.value <= props.maxValue) {
    spinValue.value -= isneg ? props.stepValue : -1 * props.stepValue;
  }
  if (spinValue.value <= props.minValue) {
    spinValue.value = props.minValue;
  }
  if (spinValue.value >= props.maxValue) {
    spinValue.value = props.maxValue;
  }
  return spinValue.value;
}

</script>

<template>
  <div class="spinbtn" :class="{'notstacked' : notStacked}">
    <input type="number" v-model="spinValue" :min="minValue" :max="maxValue" :placeholder="spinPH">
    <button @click="function () {add(true)}">-</button>
    <button @click=" function () {add(false)}">+</button>
  </div>
</template>

<style scoped>
.spinbtn {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
}

.spinbtn > * {
  background: var(--bg2);
  border: none;
  text-align: center;
  color: var(--text);
  transition: all 0.25s;
}

.spinbtn > input {
  flex-shrink: 1;
  flex-grow: 1;
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  padding: 16px 0;
}

.spinbtn > button {
  padding: 0 16px;
  font-weight: bold;
  font-size: 1.2em;
}

.isfirst > *:first-child {
  border-radius: 24px 0 0 0;
}

.isfirst > *:last-child {
  border-radius: 0 24px 0 0;
}

.islast > *:first-child {
  border-radius: 0 0 0 24px;
}

.islast > *:last-child {
  border-radius: 0 0 24px 0;
}

.notstacked > *:first-child {
  border-radius: 999px 0 0 999px;
}

.notstacked > *:last-child {
  border-radius: 0 999px 999px 0;
}

.spinbtn > *:hover {
  background: var(--bg3);
  z-index: 6;
}
</style>