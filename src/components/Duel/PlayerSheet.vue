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
  <div class="plsh">
    <div v-if="!histShown">
      <h3>{{ player.name }}</h3>
      <h1>{{ player.lps }}</h1>
      <div>
        <WideButton
            @update:buttonClicked="calcShown = !calcShown"
            :shown-title="hasTimer ? '' : 'Calculator'"
            img-link="/icons/calc.png"
        />
        <WideButton
            @update:buttonClicked="histShown = !histShown"
            :shown-title="hasTimer ? '' : 'History'"
            img-link="/icons/hist.png"
        />
        <WideButton
            v-if="hasTimer"
            @update:buttonClicked="$emit('update:playerSwitched')"
            :is-disabled="!isFocused"
            :is-important="isFocused"
            :shown-title="player.timer"
            img-link="/icons/timer.png"
        />
        <WideButton
            @update:buttonClicked="player.timer += addedTime"
            :is-disabled="!isFocused"
            v-if="hasTimer"
            :shown-title="`+${addedTime}s`"
            img-link="/icons/add.png"
        />
      </div>
    </div>
    <div class="hist" v-if="histShown">
      <div>
        <p v-if="hist.length === 0">Empty</p>
        <p v-for="e in hist">
          {{ e }}
        </p>
      </div>
      <div>
        <WideButton
            @update:buttonClicked="hist = []"
            shown-title="Clear"
            img-link="/icons/reset.png"
        />
        <WideButton
            @update:buttonClicked="histShown = !histShown"
            shown-title="Back"
            img-link="/icons/back.png"
        />
      </div>
    </div>
  </div>
  <Calculator v-if="calcShown"
              :og-value="player.lps"
              :hist="hist"
              @update:valueUpdated="args => {
                player.lps = args ; calcShown = !calcShown;
                if(args <= 0) {$emit('update:zeroLPS')}}"
              @update:calcClosed="calcShown = !calcShown"
  />
</template>

<style scoped>
@media screen and (orientation: landscape) {
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
</style>