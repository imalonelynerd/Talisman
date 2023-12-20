<script setup>

import WideButton from "@/components/Inputs/WideButton.vue";

defineProps([
  "number"
])

</script>

<template>
  <div class="counter">
    <input type="text" :placeholder="`Counter n°${number}`">
    <input type="text" placeholder="0">
  </div>
</template>

<style scoped>
@media screen and (orientation: landscape) {
  .counter {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    width: 128px;
    box-shadow: var(--shadow);
  }

  .counter > input {
    padding: 8px;
    border: none;
    background: var(--widget);
    color: var(--text);
    text-align: center;
  }

  .counter > input:hover {
    background: var(--hover);
  }

  .counter > input:first-of-type {
    border-radius: var(--radius) var(--radius) 0 0;
  }

  .counter > input:last-of-type {
    flex-grow: 1;
    border-radius: 0 0 var(--radius) var(--radius);
  }
}
</style>