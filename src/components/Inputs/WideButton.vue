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
  <a :class="{ 'disabled' : isDisabled && isDisabled === true, 'important' : isImportant && isImportant === true}"
     :title="shownTitle"
     class="wbtn"
     @click="$emit(isDisabled && isDisabled === true ? 'update:buttonDisabled' : 'update:buttonClicked')">
    <img v-if="imgLink && imgLink !== ''" :alt="imgLink" :src="imgLink">
    <p v-show="shownTitle !== ''">{{ shownTitle }}</p>
  </a>
</template>

<style scoped>
@media screen and (hover: hover) {
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

@media screen and (hover: none) {
  .wbtn {
    padding: 4vw 6vw;
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
    gap: 2vw;
  }

  .wbtn:active {
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

  .important:active {
    background: var(--imphover);
  }
}

</style>