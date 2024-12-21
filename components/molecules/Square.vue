<template>
  <li :class="className" @click="onClick" />
</template>

<script setup lang="ts">
import type { Square } from 'original';

const props = defineProps<{
  square: Square,
}>();
const emit = defineEmits<{
  (e: 'click', square: Square): void,
}>();

const className = ref(props.square.layer);
const onClick = () => {
  emit('click', props.square);
};

watchEffect(() => {
  className.value = props.square.layer;
});
</script>
