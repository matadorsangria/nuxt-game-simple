<template>
  <div id="board" :class="`board turn${store.state.turn} scene_${store.state.scene}`">
    <ul :style="boardStyle">
      <Square
        v-for="square in store.state.board"
        :key="square.id"
        :square="square"
        :style="square.style"
        @click="onClick"
      />
    </ul>
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
ul {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #999;
  border-width: 0 1px 1px 0;

  li {
    box-sizing: border-box;
    border: 1px solid #999;
    border-width: 1px 0 0 1px;

    &.current {
      background: #ffd;
    }

    .scene_movefocus &.us,
    .scene_movefocus &.enemy {
      background: #eee;
    }
    .scene_movefocus &.focused {
      background: #ddffff;
      cursor: pointer;

      &:hover {
        box-shadow: 0px 0px 6px 3px #aff inset;
      }
    }
    .scene_attackfocus &.focused {
      background: #eee;
    }
    .scene_attackfocus.turn0 &.us {
      background: #eee;
    }
    .scene_attackfocus.turn1 &.us {
      background: #fdf;
    }
    .scene_attackfocus.turn0 &.enemy {
      background: #fdf;
      cursor: pointer;
    }
    .scene_attackfocus.turn1 &.enemy {
      background: #eee;

      &:hover {
        box-shadow: 0px 0px 6px 3px #faf inset;
      }
    }
  }
}
</style>
