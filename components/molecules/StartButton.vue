<template>
  <v-btn :color="colorObj[level]" @click="onClick(level)">
    {{ level.toUpperCase() }}
  </v-btn>
</template>

<script setup lang="ts">
import { useStore } from '~/composables/store';
import type { Level } from 'original';

defineProps<{
  level: Level,
}>();
const emit = defineEmits<{
  (e: 'click'): void,
}>()

const store = useStore();

const colorObj = {
  easy: 'green',
  normal: 'yellow',
  hard: 'red',
};

const onClick = (level: Level) => {
  emit('click');
  store.setPeople(level);
  setTimeout(() => {
    store.setPeople(level);
  }, 1000);
};
</script>
