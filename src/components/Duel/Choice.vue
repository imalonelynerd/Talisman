<script setup>

import WideButton from "@/components/Inputs/WideButton.vue";

defineProps(["p1name", "p2name"]);

defineEmits([
  "update:p1",
  "update:p2"
])

</script>

<template>
  <div class="choice">
    <h1>Choose who should play first !</h1>
    <div>
      <WideButton
          :shown-title="p1name"
          img-link="/icons/player.png"
          @update:buttonClicked="$emit('update:p1')"
      />
      <WideButton
          :shown-title="p2name"
          img-link="/icons/player.png"
          @update:buttonClicked="$emit('update:p2')"
      />
      <WideButton
          img-link="/icons/random.png"
          shown-title="Random"
          @update:buttonClicked="$emit(Math.floor(Math.random() * 2) === 0 ? 'update:p1' : 'update:p2')"
      />
    </div>
  </div>
  <div class="choice-container"></div>

</template>

<style scoped>

@media screen and (hover: hover) {
  .choice-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: color-mix(in srgb, var(--bg), transparent 50%);
    z-index: 4;
    animation: BgAnimation ease-out 0.25s;
  }

  .choice {
    z-index: 5;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 350px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 32px;
    background: var(--bg);
    animation: SlideAnimation ease-out 0.25s;
    padding: 64px;
  }

  .choice > * {
    margin: 0;
    text-align: center;
  }

  .choice > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
}

@media screen and (hover: none) {
  .choice-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: color-mix(in srgb, var(--bg), transparent 50%);
    z-index: 4;
    animation: BgAnimation ease-out 0.25s;
  }

  .choice {
    z-index: 5;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 6vw;
    background: var(--bg);
    animation: SlideAnimation ease-out 0.25s;
    padding: 12vw;
  }

  .choice > * {
    margin: 0;
    text-align: center;
  }

  .choice > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4vw;
  }
}

</style>