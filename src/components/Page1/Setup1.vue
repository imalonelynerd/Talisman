<script setup>

import SpinInput from "@/components/Page1/SpinInput.vue";
import StackedInputs from "@/components/Page1/StackedInputs.vue";
import {ref} from "vue";

const objs = ref([
  ["", "Player 1"],
  ["", "Player 2"]
])

</script>

<template>
  <div class="setup1">
    <div>
      <p>Players's names</p>
      <StackedInputs :input-confs="objs"/>
    </div>
    <div>
      <p>Life Points (LP)</p>
      <SpinInput default-value="8000" min-value="100" max-value="1000000" step-value="100" spin-p-h="8000"
                 :not-stacked="true"/>
    </div>
  </div>
</template>

<style scoped>
.setup1 {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
}

.setup1 > *:not(:last-child) {
  margin-bottom: 16px;
}

.setup1 > div {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

.setup1 > div > p {
  margin: 0;
  text-align: center;
}

.setup1 > div > *:not(:last-child) {
  margin-bottom: 8px;
}
</style>