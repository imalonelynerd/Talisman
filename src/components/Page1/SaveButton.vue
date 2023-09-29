<script setup>

</script>

<template>
  <button title="Save a preset">
    <img src="/images/tools/save.png">
  </button>
</template>

<style scoped>
button {
  border-radius: 32px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  background: var(--bg2);
  border: none;
  text-align: center;
  color: var(--text);
  transition: all 0.25s;
}

button > img {
  width: 24px;
}

button:hover {
  background: var(--bg3);
}
</style>