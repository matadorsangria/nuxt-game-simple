<template>
  <div id="board" :class="`board turn${turn} scene_${scene}`">
    <ul :style="boardStyle">
      <Square
        v-for="square in board"
        :key="square.id"
        :square="square"
        :style="square.style"
      />
    </ul>
  </div>
</template>

<script>
import { defineComponent, computed, useStore } from '@nuxtjs/composition-api';
import Square from '../molecules/Square.vue';

export default defineComponent({
  components: {
    Square,
  },
  setup() {
    const store = useStore();
    const board = computed(() => store.state.board);
    const boardStyle = computed(() => store.state.boardStyle);
    const turn = computed(() => store.state.turn);
    const scene = computed(() => store.state.scene);

    return {
      board,
      boardStyle,
      turn,
      scene,
    };
  },
});
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
