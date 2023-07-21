<script setup>
import Cube from "./Cube.vue";

const props = defineProps({
  cubesPosition: Array
})
</script>

<template>
  <div class="container">
    <div class="title green">Game</div>
    <div class="cubes">
      <Cube v-for="item in props.cubesPosition" :position=item></Cube>
    </div>
  </div>
</template>

<style scoped>

</style>
