<script setup>
const positionArr = ['rolling', 'show-front', 'show-right', 'show-top', 'show-bottom', 'show-left', 'show-back'];
const props = defineProps({
  position: Number
});
</script>
<template>
  <div class="scene">
    <div class="cube" :class=positionArr[props.position]>
      <div class="cube__face cube__face--front"></div>
      <div class="cube__face cube__face--back"></div>
      <div class="cube__face cube__face--right"></div>
      <div class="cube__face cube__face--left"></div>
      <div class="cube__face cube__face--top"></div>
      <div class="cube__face cube__face--bottom"></div>
    </div>
  </div>
</template>
