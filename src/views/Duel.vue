<script setup>

import {ref} from "vue";
import PlayerSheet from "@/components/Duel/PlayerSheet.vue";
import {useRouter} from "vue-router";
import Timer from "@/components/Duel/Timer.vue";
import Tools from "@/components/Duel/Tools.vue";
import Counters from "@/components/Duel/Counters.vue";
import Parallax from "@/components/Duel/Parallax.vue";
import Choice from "@/components/Duel/Choice.vue";

const props = defineProps([
  "setup",
  "results",
  "canPass"
])

const router = useRouter();

if (props.canPass === undefined || props.canPass.v === false) {
  useRouter().push('/');
}

props.canPass.v = false;

const choiceShown = ref(props.setup.timertype === "2");
const playerTurn = ref({
  turn: 0,
  stop: -1
});

const p1 = ref({
  name: props.setup.p1name === "" ? "Player 1" : props.setup.p1name,
  lps: props.setup.lps,
  timer: props.setup.ptime,
})

const p2 = ref({
  name: props.setup.p2name === "" ? "Player 2" : props.setup.p2name,
  lps: props.setup.lps,
  timer: props.setup.ptime,
})

const time = ref(0);
switch (props.setup.timertype) {
  case "1":
    time.value = props.setup.countdown;
    break;
  default:
    time.value = 0;
    break;
}

const timeo = ref({
  t: props.setup.type === "2" ? "---" : time.value,
  running: false,
  stop: -1
});

function nexus() {
  playerTurn.value.stop = setInterval(function () {
    let p = playerTurn.value.turn === 1 ? p1 : p2;
    let t = p.value.timer;
    if (t === "0") {
      winAnnouncement(p1, p2, 'Time out !', "---");
    }
    p.value.timer -= 1;
  }, 1000);
}

function switchPlayer() {
  clearInterval(playerTurn.value.stop);
  playerTurn.value.turn = playerTurn.value.turn === 2 ? 1 : 2;
  nexus();
}

function winAnnouncement(p1, p2, reason, timer) {
  console.log(p1, p2, reason, timer);
  let winner = p1.lps === p2.lps ? null : (p1.lps > p2.lps ? p1 : p2);
  let loser = winner === null ? null : winner === p1 ? p2 : p1;
  props.results.winner = winner === null ? "Tie" : winner.name;
  props.results.reason = reason;
  let wlps = winner === null ? p1.lps : winner.lps;
  let llps = winner === null ? p1.lps : loser.lps
  props.results.wlps = wlps;
  props.results.llps = llps;
  props.results.ratio = llps === 0 ? '∞' : wlps / llps;
  props.results.timer = timer;
  props.canPass.v = true;
  router.push('/results');
}

</script>

<template>
  <Parallax bg-img="/images/bg.jpg"/>
  <Choice
      v-if="choiceShown"
      @update:p1="choiceShown = !choiceShown; playerTurn.turn = 1; nexus()"
      @update:p2="choiceShown = !choiceShown; playerTurn.turn = 2; nexus()"
      :p1name="p1.name"
      :p2name="p2.name"/>
  <div class="duel">
    <div>
      <PlayerSheet
          :player="p1"
          :has-timer="setup.timertype === '2'"
          :added-time="setup.atime"
          :is-focused="playerTurn.turn === 1"
          @update:playerSwitched="switchPlayer()"
          @update:zeroLPS="winAnnouncement(p1, p2, 'K.O !', setup.timertype === '0' ? timeo.t : time - timeo.t)"
      />
      <PlayerSheet
          :player="p2"
          :has-timer="setup.timertype === '2'"
          :added-time="setup.atime"
          :is-focused="playerTurn.turn === 2"
          @update:playerSwitched="switchPlayer()"
          @update:zeroLPS="winAnnouncement(p1, p2, 'K.O !', setup.timertype === '0' ? timeo.t : time - timeo.t)"
      />
    </div>
    <div>
      <Timer
          :time="time"
          :timeo="timeo"
          :type="setup.timertype"
          @update:timerEnded="winAnnouncement(p1, p2, 'Time out !', setup.countdown)"
      />
      <Tools/>
      <Counters/>
    </div>
  </div>
</template>

<style scoped>

@media screen and (orientation: landscape) {
  .duel {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    animation: FadeAnimation ease-out 0.5s;
  }

  .duel > * {
    width: 1200px;
  }

  .duel > div:first-of-type {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: center;
    gap: 24px;
  }

  .duel > div:first-of-type > *:first-child,
  .duel > div:first-of-type > *:last-child {
    flex-grow: 1;
  }

  .duel > div:last-of-type {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    gap: 24px;
  }

  .duel > div:last-of-type > div:last-of-type {
    flex-grow: 1;
  }
}

</style>