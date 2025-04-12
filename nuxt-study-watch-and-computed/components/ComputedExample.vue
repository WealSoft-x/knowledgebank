<template>
  <div>
    <h1>Computed プロパティの仕組み</h1>
    <p>以下は、computed プロパティを使った例です。</p>
    <div>
      <p>カウント値: {{ number }}</p>
      <button @click="incrementNumber">カウントを増やす</button>
    </div>
    <p>カウント値の2倍: {{ doubled }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const number = ref(0);
const doubled = computed(() => number.value * 2);

function incrementNumber() {
  number.value++;
}
</script>
