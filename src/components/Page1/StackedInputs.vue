<script setup>
defineProps(
    ['inputConfs']
)
</script>

<template>
  <div class="stacked1">
    <input type="text" v-for="elem in inputConfs" :placeholder="elem[1]" :value="elem[0]"/>
  </div>
</template>

<style scoped>
.stacked1 {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

.stacked1 > * {
  flex-grow: 1;
  background: var(--bg2);
  border: none;
  text-align: center;
  color: var(--text);
  transition: all 0.25s;
  padding: 16px 0;
}

.stacked1 > *:first-child {
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
}

.stacked1 > *:last-child {
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
}

.stacked1 > *:hover {
  background: var(--bg3);
  z-index: 6;
}
</style>