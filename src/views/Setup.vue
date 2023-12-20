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
      <DoubleInput place-holder1="Player 1 Name"
                   :custom-value1="setup.p1name"
                   place-holder2="Player 2 Name"
                   :custom-value2="setup.p2name"
                   @update:value1Updated="v => setup.p1name = v"
                   @update:value2Updated="v => setup.p2name = v"
      />
      <NumberInput place-holder="Life Points (LP)"
                   :custom-value="setup.lps"
                   :min-value="100"
                   :max-value="99999"
                   :number-step="1000"
                   @update:valueUpdated="v => setup.lps = v"/>
      <DropdownMenu :option-list="['Chronometer', 'Timer', 'Nexus-like']"
                    :default-selected="setup.timertype"
                    menu-name="Timer type"
                    @update:optionChosen="v => setup.timertype = v"
      />
      <NumberInput place-holder="Countdown"
                   :custom-value="setup.countdown"
                   :min-value="10"
                   :max-value="99999"
                   :number-step="10"
                   @update:valueUpdated="v => setup.countdown = v"
                   v-if="setup.timertype === '1'"
      />
      <NumberInput place-holder="Player's time"
                   :custom-value="setup.ptime"
                   :min-value="10"
                   :max-value="99999"
                   :number-step="10"
                   @update:valueUpdated="v => setup.ptime = v"
                   v-if="setup.timertype === '2'"
      />
      <NumberInput place-holder="Added time"
                   :custom-value="setup.atime"
                   :min-value="10"
                   :max-value="99999"
                   :number-step="10"
                   @update:valueUpdated="v => setup.atime = v"
                   v-if="setup.timertype === '2'"
      />
    </div>
    <div>
      <WideButton
          @update:buttonClicked="savePreset(setup)"
          shown-title="Save"
          img-link="/icons/save.png"
      />
      <WideButton
          @update:buttonClicked="loadPreset(setup)"
          shown-title="Load"
          img-link="/icons/load.png"
      />
      <WideButton
          @update:buttonClicked="canPass.v = true; $router.push('/duel')"
          :is-important="true"
          shown-title="Start"
          img-link="/icons/start.png"
      />
    </div>
  </div>
</template>

<style scoped>
@media screen and (orientation: landscape) {
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
</style>