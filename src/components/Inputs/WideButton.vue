<script setup>
defineProps([
  "imgLink",
  "shownTitle",
  "isDisabled",
  "isImportant"
])

defineEmits(['update:buttonClicked', 'update:buttonDisabled']);
</script>

<template>
  <a class="wbtn"
     :class="{ 'disabled' : isDisabled && isDisabled === true, 'important' : isImportant && isImportant === true}"
     @click="$emit(isDisabled && isDisabled === true ? 'update:buttonDisabled' : 'update:buttonClicked')"
     :title="shownTitle">
    <img v-if="imgLink && imgLink !== ''" :src="imgLink" :alt="imgLink">
    <p v-show="shownTitle !== ''">{{ shownTitle }}</p>
  </a>
</template>

<style scoped>
@media screen and (orientation: landscape) {
  .wbtn {
    padding: 16px 24px;
    border-radius: var(--radius-button);
    box-shadow: var(--shadow);
    font-size: 1em;
    font-weight: bold;
    border: none;
    background: var(--widget);
    color: var(--text);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 8px;
  }

  .wbtn:hover {
    background: var(--hover);
  }

  .wbtn > img {
    height: 1.25em;
    transition: all 0s !important;
  }

  .wbtn > p {
    margin: 0;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .disabled > * {
    opacity: 0.5 !important;
  }

  .color > img {
    filter: none !important;
  }

  .important {
    background: var(--imp);
  }

  .important:hover {
    background: var(--imphover);
  }
}
</style>