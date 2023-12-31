<script setup>
const props = defineProps(['customValue', 'placeHolder', 'minValue', 'maxValue', 'numberStep', 'noNumbers']);
defineEmits(['update:valueUpdated']);

function isNumber(value) {
  return value !== "" && !isNaN(value);
}

function validValue(value) {
  if (!isNumber(value) || value < props.minValue) {
    return props.minValue;
  }
  if (value > props.maxValue) {
    return props.maxValue;
  }
  return value;
}

</script>

<template>
  <div class="nbinput">
    <p v-if="placeHolder !== ''">{{ placeHolder }}</p>
    <input
        :max="maxValue"
        :min="minValue"
        :step="numberStep"
        :value="customValue"
        type="number"
        @blur="
          $event.target.value = validValue($event.target.value);
          $emit('update:valueUpdated', validValue($event.target.value))"
    />
    <a v-if="noNumbers === undefined || noNumbers === false"
       @click="customValue = validValue(customValue - numberStep);
               $emit('update:valueUpdated', customValue)"
    >
      <img src="/icons/remove.png"/>
    </a>
    <a v-if="noNumbers === undefined || noNumbers === false"
       @click="customValue = validValue(customValue - (-numberStep));
               $emit('update:valueUpdated', customValue)"
    >
      <img src="/icons/add.png"/>
    </a>
  </div>
</template>

<style scoped>
@media screen and (hover: hover) {
  .nbinput {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-button);
    background: var(--widget);
    box-shadow: var(--shadow);
  }

  .nbinput > p {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 24px;
    font-size: 0.95em;
    opacity: 0.5;
    flex-grow: 1;
  }

  .nbinput > * {
    border-radius: var(--radius-button);
    background: var(--widget);
    border: none;
    font-size: 1em;
    color: var(--text);
  }

  .nbinput > *:not(p):hover {
    background: var(--hover) !important;
  }

  .nbinput > a {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .nbinput > a > img {
    height: 1em;
  }

  .nbinput > input {
    text-align: center;
    -moz-appearance: textfield;
    -webkit-appearance: textfield;
    padding: 16px 24px;
    flex: 1 1;
    min-width: 100px;
  }
}

@media screen and (hover: none) {
  .nbinput {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-button);
    background: var(--widget);
    box-shadow: var(--shadow);
  }

  .nbinput > p {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 4vw;
    font-size: 0.95em;
    opacity: 0.5;
    flex-grow: 1;
  }

  .nbinput > * {
    border-radius: var(--radius-button);
    background: var(--widget);
    border: none;
    font-size: 1em;
    color: var(--text);
  }

  .nbinput > *:not(p):active {
    background: var(--hover) !important;
  }

  .nbinput > a {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 4vw;
  }

  .nbinput > a > img {
    height: 1em;
  }

  .nbinput > input {
    text-align: center;
    -moz-appearance: textfield;
    -webkit-appearance: textfield;
    padding: 4vw 6vw;
    flex: 1 1;
    min-width: 30vw;
  }
}
</style>