<script setup>

import DropdownMenu from "@/components/Inputs/DropdownMenu.vue";
import DoubleInput from "@/components/Inputs/DoubleInput.vue";
import NumberInput from "@/components/Inputs/NumberInput.vue";
import WideButton from "@/components/Inputs/WideButton.vue";
import {loadPreset, savePreset} from "@/assets/js/miscTools";

defineProps(["setup", "canPass"]);
</script>

<template>
  <div class="setup">
    <div>
      <img src="/images/icon.png"/>
      <h1>Let's setup the duel...</h1>
    </div>
    <div>
      <DoubleInput :custom-value1="setup.p1name"
                   :custom-value2="setup.p2name"
                   place-holder1="Player 1 Name"
                   place-holder2="Player 2 Name"
                   @update:value1Updated="v => setup.p1name = v"
                   @update:value2Updated="v => setup.p2name = v"
      />
      <NumberInput :custom-value="setup.lps"
                   :max-value="99999"
                   :min-value="100"
                   :number-step="1000"
                   place-holder="Life Points (LP)"
                   @update:valueUpdated="v => setup.lps = v"/>
      <DropdownMenu :default-selected="setup.timertype"
                    :option-list="['Chronometer', 'Timer', 'Nexus-like']"
                    menu-name="Timer type"
                    @update:optionChosen="v => setup.timertype = v"
      />
      <NumberInput v-if="setup.timertype === '1'"
                   :custom-value="setup.countdown"
                   :max-value="99999"
                   :min-value="10"
                   :number-step="10"
                   place-holder="Countdown"
                   @update:valueUpdated="v => setup.countdown = v"
      />
      <NumberInput v-if="setup.timertype === '2'"
                   :custom-value="setup.ptime"
                   :max-value="99999"
                   :min-value="10"
                   :number-step="10"
                   place-holder="Player's time"
                   @update:valueUpdated="v => setup.ptime = v"
      />
      <NumberInput v-if="setup.timertype === '2'"
                   :custom-value="setup.atime"
                   :max-value="99999"
                   :min-value="10"
                   :number-step="10"
                   place-holder="Added time"
                   @update:valueUpdated="v => setup.atime = v"
      />
    </div>
    <div>
      <WideButton
          img-link="/icons/save.png"
          shown-title="Save"
          @update:buttonClicked="savePreset(setup)"
      />
      <WideButton
          img-link="/icons/load.png"
          shown-title="Load"
          @update:buttonClicked="loadPreset(setup)"
      />
      <WideButton
          :is-important="true"
          img-link="/icons/start.png"
          shown-title="Start"
          @update:buttonClicked="canPass.v = true; $router.push('/duel')"
      />
    </div>
  </div>
</template>

<style scoped>
@media screen and (hover: hover) {
  .setup {
    position: fixed;
    padding: 64px 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 32px;
    overflow: scroll;
    animation: FadeAnimation ease-out 0.5s;
  }

  .setup > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: center;
    gap: 16px;
  }

  .setup > div:nth-child(1) > * {
    margin: 0;
  }

  .setup > div:nth-child(1) > img {
    height: 160px;
    width: 160px;
    margin: 0 auto;
  }

  .setup > div:nth-child(2) {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: stretch;
    gap: 12px;
  }

  .setup > div:nth-child(3) {
    width: 400px;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: stretch;
    gap: 8px;
  }

  .setup > div:nth-child(3) > * {
    flex-grow: 1;
  }
}

@media screen and (hover: none) {
  .setup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 24vw 6vw;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: start;
    gap: 8vw;
    overflow: scroll;
    animation: FadeAnimation ease-out 0.5s;
  }

  .setup > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: center;
    gap: 4vw;
  }

  .setup > div:nth-child(1) > * {
    margin: 0;
  }

  .setup > div:nth-child(1) > img {
    height: 40vw;
    width: 40vw;
    margin: 0 auto;
  }

  .setup > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: stretch;
    gap: 2vw;
  }

  .setup > div:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    gap: 2vw;
  }

  .setup > div:nth-child(3) > * {
    flex-grow: 1;
  }
}
</style>