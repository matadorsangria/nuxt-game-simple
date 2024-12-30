<template>
  <section
    :class="`turn${store.state.turn} scene_${store.state.scene} ${square.layer}`"
    :style="square.style"
    @click="onClick"
  />
</template>

<script setup lang="ts">
import type { Square } from 'original';
import { useStore } from '~/composables/store';

const props = defineProps<{
  square: Square,
}>();
const emit = defineEmits<{
  (e: 'click', square: Square): void,
}>();
const store = useStore();
const onClick = () => {
  emit('click', props.square);
};
</script>

<style scoped lang="scss">
section {
  box-sizing: border-box;
  border: 1px solid #999;
  border-width: 1px 0 0 1px;

  &.current {
    background: #ffd;
  }

  &.scene_movefocus.us,
  &.scene_movefocus.enemy {
    background: #eee;
  }
  &.scene_movefocus.focused {
    background: #ddffff;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 0px 6px 3px #aff inset;
    }
  }
  &.scene_attackfocus.focused {
    background: #eee;
  }
  &.scene_attackfocus.turn0.us {
    background: #eee;
  }
  &.scene_attackfocus.turn1.us {
    background: #fdf;
  }
  &.scene_attackfocus.turn0.enemy {
    background: #fdf;
    cursor: pointer;
  }
  &.scene_attackfocus.turn1.enemy {
    background: #eee;

    &:hover {
      box-shadow: 0px 0px 6px 3px #faf inset;
    }
  }
}
</style>
