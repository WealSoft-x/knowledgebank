<template>
  <div>
    <h1>Computed を使わずに同様の状態を再現したパターン</h1>
    <p>以下は、watch を使って computed と同様の機能を実装した例です。</p>
    <div>
      <p>カウント値: {{ numberWithWatch }}</p>
      <button @click="incrementNumberWithWatch">カウントを増やす</button>
    </div>
    <p>カウント値の2倍: {{ doubledWithWatch }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

// Computedを使わずに同様の状態を再現
const numberWithWatch = ref(0);
const doubledWithWatch = ref(0);

function incrementNumberWithWatch() {
  numberWithWatch.value++;
}

// watchを使って値が変わるたびにdoubledWithWatchを更新
watch(
  numberWithWatch,
  (newValue) => {
    doubledWithWatch.value = newValue * 2;
  },
  { immediate: true }
);
</script>
