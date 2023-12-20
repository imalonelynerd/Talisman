<script setup>
defineProps(['customValue', 'placeHolder']);
defineEmits(['update:valueUpdated']);
</script>

<template>
  <input :placeholder="placeHolder"
         :value="customValue"
         class="phinput"
         type="text"
         @input="$emit('update:valueUpdated', $event.target.value)">
</template>

<style scoped>
@media screen and (orientation: landscape) {
  .phinput {
    padding: 16px 24px;
    border-radius: var(--radius-button);
    border: none;
    font-size: 1em;
    background: var(--widget);
    color: var(--text);
    flex: 1 1;
    box-shadow: var(--shadow);
  }

  .phinput:hover {
    background: var(--hover) !important;
  }
}

@media screen and (orientation: portrait) {
  .phinput {
    padding: 4vw 6vw;
    border-radius: var(--radius-button);
    border: none;
    font-size: 1em;
    background: var(--widget);
    color: var(--text);
    flex: 1 1;
    box-shadow: var(--shadow);
    text-align: center;
  }

  .phinput:hover {
    background: var(--hover) !important;
  }
}


</style>