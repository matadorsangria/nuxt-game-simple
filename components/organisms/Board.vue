<template>
  <div class="board" :style="boardStyle">
    <Square
      v-for="square in store.state.board"
      :key="square.id"
      :square="square"
      :turn="store.state.turn"
      :scene="store.state.scene"
      @click="onClick"
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~/composables/store';
import type { HtmlHTMLAttributes } from 'vue';
import Square from '../molecules/Square.vue';
import type { Square as SquareProps } from '~/types/original';

const emit = defineEmits<{
  (e: 'click', square: SquareProps): void,
}>();

const store = useStore();
const boardStyle = store.state.boardStyle as HtmlHTMLAttributes['style'];
const onClick = (square: SquareProps) => {
  emit('click', square);
  store.squareClick(square);
}
</script>

<style scoped lang="scss">
.board {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #999;
  border-width: 0 1px 1px 0;
}
</style>
