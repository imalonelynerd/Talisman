<script setup>

import {ref} from "vue";
import WideButton from "@/components/Inputs/WideButton.vue";
import Counter from "@/components/Duel/Counter.vue";

const ctrs = ref([1, 2, 3]);

</script>

<template>
  <div class="counters">
    <div>
      <Counter v-for="e in ctrs" :number="e"/>
    </div>
    <div>
      <wide-button
          @update:buttonClicked="ctrs.push(ctrs.length + 1)"
          shown-title=""
          img-link="/icons/add.png"/>
      <wide-button
          @update:buttonClicked="ctrs.pop()"
          shown-title=""
          img-link="/icons/remove.png"/>
    </div>
  </div>
</template>

<style scoped>
@media screen and (orientation: landscape) {
  .counters {
    padding: 24px;
    background: var(--bg);
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    gap: 12px;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }

  .counters > div:first-of-type {
    width: 455px; /* 465px */
    overflow: scroll;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: start;
    gap: 8px;
    border-radius: var(--radius);
  }

  .counters > div:last-of-type {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: center;
    gap: 8px;
  }
}
</style>