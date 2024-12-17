<template>
  <li :class="className" @click="onClick" />
</template>

<script setup lang="ts">
import { useStore } from '~/composables/store';
import type { Square } from 'original';

const props = defineProps<{
  square: Square,
}>();

const store = useStore();
const className = ref(props.square.layer);
const onClick = () => {
  store.squareClick(props.square);
};

watchEffect(() => {
  className.value = props.square.layer;
});
</script>
