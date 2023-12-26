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
          img-link="/icons/add.png"
          shown-title=""
          @update:buttonClicked="ctrs.push(ctrs.length + 1)"/>
      <wide-button
          img-link="/icons/remove.png"
          shown-title=""
          @update:buttonClicked="ctrs.length !== 0 ? ctrs.pop(): ''"/>
    </div>
  </div>
</template>

<style scoped>
@media screen and (hover: hover) {
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

@media screen and (hover: none) {
  .counters {
    padding: 6vw;
    background: var(--bg);
    display: flex;
    flex-direction: column-reverse;
    align-items: stretch;
    justify-content: center;
    gap: 4vw;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }

  .counters > div:first-of-type {
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: start;
    gap: 8px;
    border-radius: var(--radius);
  }

  .counters > div:last-of-type {
    display: flex;
    flex-direction: row;
    align-self: stretch;
    justify-content: center;
    gap: 8px;
  }

  .counters > div:last-of-type > * {
    flex-grow: 1;
  }
}

</style>