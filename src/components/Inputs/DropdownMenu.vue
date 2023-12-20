<script setup>
import Setup from "@/views/Setup.vue";

defineProps(['optionList', 'menuName', 'defaultSelected']);
defineEmits(['update:optionChosen']);
</script>

<template>
  <div class="ddinput">
    <p>{{ menuName }}</p>
    <select @change="$emit('update:optionChosen', $event.target.value)">
      <option v-for="(e,i) in optionList"
              :value="i" :selected="defaultSelected === '' + i ? 'true' : undefined">
        {{ e }}
      </option>
    </select>
  </div>

</template>

<style scoped>
@media screen and (orientation: landscape) {
  .ddinput {
    border-radius: var(--radius-button);
    background: var(--widget);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow);
  }

  .ddinput > p {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 24px;
    font-size: 0.95em;
    opacity: 0.5;
  }

  .ddinput > select {
    padding: 16px 24px;
    border-radius: var(--radius-button);
    border: none;
    text-align: center;
    -moz-appearance: none;
    -webkit-appearance: none;
    font-size: 1em;
    background: var(--widget);
    color: var(--text);
    flex: 1 1;
  }

  .ddinput > select:hover {
    background: var(--hover) !important;
  }
}
</style>