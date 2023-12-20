<script setup>

import WideButton from "@/components/Inputs/WideButton.vue";
import {ref} from "vue";
import NumberInput from "@/components/Inputs/NumberInput.vue";

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
          @update:buttonClicked="$emit('update:p1')"
          :shown-title="p1name"
          img-link="/icons/player.png"
      />
      <WideButton
          @update:buttonClicked="$emit('update:p2')"
          :shown-title="p2name"
          img-link="/icons/player.png"
      />
      <WideButton
          @update:buttonClicked="$emit(Math.floor(Math.random() * 2) === 0 ? 'update:p1' : 'update:p2')"
          shown-title="Random"
          img-link="/icons/random.png"
      />
    </div>
  </div>
  <div class="choice-container"></div>

</template>

<style scoped>

@media screen and (orientation: landscape) {
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

</style>