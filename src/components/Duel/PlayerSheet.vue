<script setup>
import {ref} from "vue";
import WideButton from "@/components/Inputs/WideButton.vue";
import Calculator from "@/components/Duel/Calculator.vue";

defineProps([
  "player",
  "hasTimer",
  "addedTime",
  "isFocused"
])

defineEmits([
  "update:playerSwitched",
  "update:zeroLPS"
])

const hist = ref([]);
const histShown = ref(false);
const calcShown = ref(false);

</script>

<template>
  <Calculator v-if="calcShown"
              :hist="hist"
              :og-value="player.lps"
              @update:calcOpened="hasTimer && isFocused ? player.timer -= (-addedTime) : ''"
              @update:valueUpdated="args => {
                player.lps = args ; calcShown = !calcShown;
                if(args <= 0) {$emit('update:zeroLPS')}}"
              @update:calcClosed="calcShown = !calcShown"
  />
  <div class="plsh">
    <div v-if="histShown" class="hist">
      <div>
        <p v-if="hist.length === 0">Empty</p>
        <p v-for="e in hist">
          {{ e }}
        </p>
      </div>
      <div>
        <WideButton
            img-link="/icons/reset.png"
            shown-title="Clear"
            @update:buttonClicked="hist = []"
        />
        <WideButton
            img-link="/icons/back.png"
            shown-title="Back"
            @update:buttonClicked="histShown = !histShown"
        />
      </div>
    </div>
    <div v-if="!histShown">
      <h3>{{ player.name }}</h3>
      <h1>{{ player.lps }}</h1>
      <div>
        <WideButton
            :shown-title="hasTimer ? '' : 'Calculator'"
            img-link="/icons/calc.png"
            @update:buttonClicked="calcShown = !calcShown"
        />
        <WideButton
            :shown-title="hasTimer ? '' : 'History'"
            img-link="/icons/hist.png"
            @update:buttonClicked="histShown = !histShown"
        />
        <WideButton
            v-if="hasTimer"
            :is-disabled="!isFocused"
            :is-important="isFocused"
            :shown-title="player.timer"
            img-link="/icons/timer.png"
            @update:buttonClicked="$emit('update:playerSwitched')"
        />
        <WideButton
            v-if="hasTimer"
            :is-disabled="!isFocused"
            :shown-title="`+${addedTime}s`"
            img-link="/icons/add.png"
            @update:buttonClicked="player.timer -= (-addedTime)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (hover: hover) {
  .plsh {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    padding: 24px;
    gap: 24px;
    border-radius: var(--radius);
    background: var(--bg);
    box-shadow: var(--shadow);
    flex-grow: 1;
    width: 400px;
    height: 220px;
  }

  .plsh > div:not(.hist) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    flex-grow: 1;
  }

  .plsh > div:not(.hist) > * {
    margin: 0;
  }

  .plsh > div:not(.hist) > h3 {
    opacity: 0.5;
    max-width: 400px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .plsh > div:not(.hist) > h1 {
    font-size: 4em;
  }

  .plsh > div:not(.hist) > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .hist {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: start;
    gap: 8px;
  }

  .hist > div:first-of-type {
    flex-grow: 1;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: -56px;
  }

  .hist > div > * {
    margin: 0;
    text-align: center;
  }

  .hist > div:last-of-type {
    align-self: end;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
}

@media screen and (hover: none) {
  .plsh {
    padding: 6vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    gap: 6vw;
    border-radius: var(--radius);
    background: var(--bg);
    box-shadow: var(--shadow);
    flex-grow: 1;
  }

  .plsh > div:not(.hist) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4vw;
    flex-grow: 1;
  }

  .plsh > div:not(.hist) > * {
    margin: 0;
  }

  .plsh > div:not(.hist) > h3 {
    opacity: 0.5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .plsh > div:not(.hist) > h1 {
    font-size: 4em;
  }

  .plsh > div:not(.hist) > div {
    width: 100%;
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
    gap: 2vw;
  }

  .hist {
    background: var(--bg);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12vw 6vw 6vw;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: start;
    gap: 2vw;
    z-index: 5;
    animation: SlideAnimation ease-out 0.25s;
  }

  .hist > div:first-of-type {
    flex-grow: 1;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    gap: 4vw;
  }

  .hist > div > * {
    margin: 0;
    text-align: center;
  }

  .hist > div:first-of-type > p {
    font-size: 1.75em;
  }

  .hist > div:last-of-type {
    align-self: end;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
}

</style>