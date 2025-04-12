<template>
  <div>
    <ComputedExample />

    <WatchExample />

    <!-- コンポーネント化した失敗例 -->
    <ReactiveFailureExample />

    <h1>Inputフィールドを使用したComputedを使わない失敗例</h1>
    <p>
      このコンポーネントでは、inputフィールドの値を2倍にする処理をcomputedプロパティを使わずに実装しています。
    </p>

    <div class="input-section">
      <label for="inputValue">数値を入力してください:</label>
      <input
        id="inputValue"
        v-model="inputValue"
        type="number"
        @input="updateDoubledValue"
      />
    </div>

    <div class="result-section">
      <p>入力した値: {{ inputValue }}</p>
      <p>表示される計算された値（失敗例）: {{ doubledValue }}</p>
      <p>内部で計算された値: {{ actualDoubledValue }}</p>
    </div>

    <div class="explanation">
      <h3>解説</h3>
      <p>この例では以下の問題が発生しています:</p>
      <ul>
        <li>
          内部では<code>doubledValue</code>に計算結果が代入されていますが、それはリアクティブではないためリアルタイムに表示へ反映されません
          ref値のリアクティブシステムによるコンポーネントの再レンダリングに巻き込まれる形で、一つ前のdoubledvalueが表示されます。
          よって、実際のdoubledvalueと表示されるdoubledvalueが異なります
        </li>
        <li>
          本来であれば<code>computed(() => inputValue * 2)</code
          >のようにcomputedを使うべきです
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ReactiveFailureExample from "./components/ReactiveFailureExample.vue";
import ComputedExample from "./components/ComputedExample.vue";
import WatchExample from "./components/WatchExample.vue";

// 入力値をリアクティブな値として定義
const inputValue = ref(0);

// computedを使わない、通常の変数として定義（リアクティブではない）
let doubledValue = 0;

const actualDoubledValue = computed(() => inputValue.value * 2);

// 入力値が変更されたときに呼び出される関数
function updateDoubledValue() {
  // 通常の変数に計算結果を代入（リアクティブではないため画面には反映されない）
  doubledValue = inputValue.value * 2;

  console.log("値が更新されました:");
  console.log("inputValue:", inputValue.value);
  console.log("doubledValue (リアクティブではない):", doubledValue);
}
</script>
<style scoped>
.input-section {
  margin: 20px 0;
}

.result-section {
  margin: 20px 0;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.explanation {
  margin-top: 30px;
  padding: 15px;
  background-color: #fff8e1;
  border-left: 4px solid #ffca28;
  border-radius: 4px;
}

label {
  margin-right: 10px;
  font-weight: bold;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
