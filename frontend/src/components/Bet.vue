<script setup>
import {ref} from "vue";

const betValue = ref(0)
</script>

<template>
  <div class="container">
    <div class="title green">Bet</div>
    <input id="bet" v-model="betValue" type="number" name="bet" step="1" min="1">
    <button @click="$emit('clickRoll', betValue)">ROLL</button>
  </div>
</template>

<style scoped>
button {
  width: 100px;
}
input {
  width: calc(100% - 120px);
  margin-right: 20px;
}
</style>
