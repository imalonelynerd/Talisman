<script setup>

import DropDown from "@/components/Page1/DropDown.vue";
import {ref} from "vue";
import SpinInput from "@/components/Page1/SpinInput.vue";
import StackedSpins from "@/components/Page1/StackedSpins.vue";
import SaveButton from "@/components/Page1/SaveButton.vue";
import LoadButton from "@/components/Page1/LoadButton.vue";
import StartButton from "@/components/Page1/StartButton.vue";

const opts = ref([
  ["1", "Chronometer"],
  ["2", "Timer"],
  ["3", "Nexus-like"]
])

const objs = ref([
  ["120", "10", "9999", "1", "Individual time"],
  ["10", "1", "9999", "1", "Added time"],
])

const selected = ref(1)

</script>

<template>
  <div class="setup2">
    <div>
      <p>Timer type</p>
      <DropDown :options-table="opts" v-model="selected"/>
    </div>
    <div v-if="selected === '2'">
      <p>Countdown</p>
      <SpinInput default-value="120" :min-value="1" :max-value="9999" :step-value="1" spin-p-h="Countdown"
                 :not-stacked="true"/>
    </div>
    <div v-if="selected === '3'">
      <p>Nexus</p>
      <StackedSpins :spin-confs="objs"/>
    </div>
    <div class="buttons">
      <SaveButton/>
      <LoadButton/>
      <StartButton/>
    </div>
  </div>
</template>

<style scoped>
.setup2 {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
}

.setup2 > *:not(:last-child) {
  margin-bottom: 16px;
}

.setup2 > div {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

.setup2 > div > p {
  margin: 0;
  text-align: center;
}

.setup2 > div:not(.buttons) > *:not(:last-child) {
  margin-bottom: 8px;
}

.buttons {
  display: flex;
  flex-direction: row !important;
  justify-content: center;
  align-items: center !important;
}

.buttons > * {
  flex-grow: 1;
}

.buttons > *:not(:last-child){
  margin-right: 8px;
}

</style>