<script setup>
import Game from "./components/Game.vue";
import Prices from "./components/Prices.vue";
import Bet from "./components/Bet.vue";
import Balance from "./components/Balance.vue";
import {onMounted, ref} from 'vue'

const cubesPosition = ref([1, 2, 3, 4, 5]);
const balance = ref(100);
const combinationName = ref("");
const combinations = ref(Object);

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

onMounted(async () => {
  const response = await fetch('http://localhost:3000/init', {
    method: 'GET',
  })
  const data = await response.json();
  balance.value = +data.balance;
  combinations.value = data.MULTIPLIER;
})

async function bet(amount) {

  if (amount < 1 || amount > balance.value) {
    return
  }

  const response = await fetch('http://localhost:3000/bet', {
    method: 'POST',
    body: JSON.stringify({
      value: amount
    })
  })
  const data = await response.json();

  if (data.error) {
    cubesPosition.value = [1, 2, 3, 4, 5]
    combinationName.value = ''
    return;
  }

  cubesPosition.value = [0, 0, 0, 0, 0];
  balance.value = balance.value - amount;
  setTimeout(() => {
    cubesPosition.value = data.combination
    combinationName.value = data.combinationName
    balance.value = +data.balance;
  }, 1000);
}
</script>

<template>
  <main>
    <div class="row">
      <div class="column">
        <Game :cubesPosition=cubesPosition></Game>
      </div>
    </div>
    <div class="row">
      <div class="column-2">
        <Prices :combinationName=combinationName :combinations=combinations></Prices>
      </div>
      <div class="column-2">
        <Bet @click-roll="bet"></Bet>
        <Balance :balance=balance></Balance>
      </div>
    </div>
  </main>
</template>
<style scoped>
</style>
