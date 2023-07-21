<script setup>
const props = defineProps({
  balance: Number
})
</script>

<template>
  <div class="container">
    <div class="title green">Your balance</div>
    <div class="balance">{{balance}}</div>
  </div>
</template>

<style scoped>
</style>
