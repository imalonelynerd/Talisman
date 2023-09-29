<script setup>

import Title from "@/components/Page1/Title.vue";
import Setup1 from "@/components/Page1/Setup1.vue";
import Setup2 from "@/components/Page1/Setup2.vue";
</script>

<template>
  <div class="page1">
    <Title/>
    <div class="setup">
      <Setup1/>
      <Setup2/>
    </div>
  </div>
</template>

<style scoped>
.page1 {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.page1 > *:not(:last-child){
  margin-bottom: 32px;
}

.setup {
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  justify-content: start;
  align-items: start;
}

.setup >*:not(:last-child) {
  margin-right: 32px;
}
</style>