<script setup>

</script>

<template>
  <div class="title">
    <img src="/images/icon_color.png">
    <h1>Let's setup the duel...</h1>
  </div>
</template>

<style scoped>
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title > *:not(:last-child) {
    margin-bottom: 16px;
  }

  .title > h1 {
    margin: 0;
  }

  .title > img {
    height: 128px;
  }
</style>