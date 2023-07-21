<script setup>
const props = defineProps({
  combinationName: String,
  combinations: Object
})
</script>

<template>
  <div class="container">
    <div class="title green">Prices</div>
    <div class="prices-list">
      <div v-for="price in combinations" :class="[ price.name === combinationName? 'win': '']" class="price-item">
        <span class="price-name">{{ price.name }}</span>
        <span class="price-multiplier">
          <span class="price-symbol">x</span>
          <span class="price-digit">{{ price.multiplier }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.price-item.win .price-name {
  font-weight: 700;
}
</style>
