<script setup>
defineProps(['optionsTable', 'modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="dropdown">
    <select @change="$emit('update:modelValue', $event.target.value)">
      <option
          v-for="elem in optionsTable"
          :value="elem[0]"
          :selected="modelValue === elem[0]">
        {{ elem[1] }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.dropdown {
  display: flex;
  align-items: stretch;
  justify-content: center;
}

.dropdown > select {
  flex-grow: 1;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: var(--bg2);
  border: none;
  text-align: center;
  color: var(--text);
  transition: all 0.25s;
  padding: 16px 0;
  border-radius: 999px;
}
</style>