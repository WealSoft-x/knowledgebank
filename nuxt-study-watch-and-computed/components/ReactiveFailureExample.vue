<template>
  <div>
    <h1>
      Computed
      を使わない場合のリアクティブが効いていない失敗例（コンポーネント）
    </h1>
    <p>以下は、リアクティブが効いていない失敗例です。</p>
    <div>
      <p>カウント値: {{ count }}</p>
      <button @click="incrementCount">カウントを増やす</button>
    </div>
    <p>カウント値の2倍 (失敗例): {{ doubledCount }}</p>
  </div>
</template>

<script setup lang="ts">
let count = 0; // refを使わずに定義
let doubledCount = 0; // refを使わずに定義

function incrementCount() {
  // カウントをインクリメント
  count++;

  // リアクティブではない変数に直接代入
  doubledCount = count * 2;
}
</script>
