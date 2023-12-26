<script setup>
defineProps(['customValue1', 'customValue2', 'placeHolder1', 'placeHolder2']);
defineEmits(['update:value1Updated', 'update:value2Updated']);
</script>

<template>
  <div class="dbinput">
    <input :placeholder="placeHolder1"
           :value="customValue1"
           type="text"
           @input="$emit('update:value1Updated', $event.target.value)">
    <input :placeholder="placeHolder2"
           :value="customValue2"
           type="text"
           @input="$emit('update:value2Updated', $event.target.value)">
  </div>

</template>

<style scoped>
@media screen and (hover: hover) {
  .dbinput {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    border-radius: var(--radius-button);
    background: var(--widget);
    box-shadow: var(--shadow);
  }

  .dbinput > input {
    text-align: center;
    width: 66%;
    padding: 16px 16px;
    border: none;
    font-size: 1em;
    color: var(--text);
    flex: 1 1;
    border-radius: var(--radius-button);
    background: transparent;
  }

  .dbinput > input:hover {
    background: var(--hover) !important;
  }
}

@media screen and (hover: none) {
  .dbinput {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    border-radius: var(--radius-button);
    background: var(--widget);
    box-shadow: var(--shadow);
  }

  .dbinput > input {
    text-align: center;
    width: 66%;
    padding: 4vw 6vw;
    border: none;
    font-size: 1em;
    color: var(--text);
    flex: 1 1;
    border-radius: var(--radius-button);
    background: transparent;
  }

  .dbinput > input:active {
    background: var(--hover) !important;
  }
}

</style>