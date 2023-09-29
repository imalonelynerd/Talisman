<script setup>
import SpinInput from "@/components/Page1/SpinInput.vue";
import {ref} from "vue";

const props = defineProps(
    ['spinConfs']
)

const end = ref(props.spinConfs.length - 1)

</script>

<template>
  <div class="stacked2">
    <SpinInput v-for="(elem, index) in spinConfs"
               :default-value="elem[0]"
               :min-value="elem[1]"
               :max-value="elem[2]"
               :step-value="elem[3]"
               :spin-p-h="elem[4]"
               :not-stacked="false"
               :class="{'isfirst' : index === 0,'islast' :index === end}"/>
  </div>
</template>

<style scoped>
.stacked2 {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

.stacked2 > * {
  flex-grow: 1;
}

.stacked2 > *:first-child {
  border-radius: 24px 24px 0 0;
}

.stacked2 > *:last-child {
  border-radius: 0 0 24px 24px;
}
</style>