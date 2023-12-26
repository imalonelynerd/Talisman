<script setup>

defineProps([
  "number"
])

</script>

<template>
  <div class="counter">
    <input :placeholder="`Counter n°${number}`" type="text">
    <input placeholder="0" type="text">
  </div>
</template>

<style scoped>
@media screen and (hover: hover) {
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

@media screen and (hover: none) {
  .counter {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    box-shadow: var(--shadow);
  }

  .counter > input {
    padding: 4vw;
    border: none;
    background: var(--widget);
    color: var(--text);
    text-align: center;
    font-size: 1em;
  }

  .counter > input:active {
    background: var(--hover);
  }

  .counter > input:first-of-type {
    border-radius: var(--radius) var(--radius) 0 0;
  }

  .counter > input:last-of-type {
    height: 2vh;
    border-radius: 0 0 var(--radius) var(--radius);
  }
}

</style>