<template>
  <v-btn :color="colorObj[level]" @click="onClick(level)">
    {{ level.toUpperCase() }}
  </v-btn>
</template>

<script lang="ts">
import { Level } from 'original';
import { defineComponent, useStore, PropType } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    level: {
      type: String as PropType<Level>,
      required: true,
    },
  },
  setup(_, context) {
    const store = useStore();

    const colorObj = {
      easy: 'green',
      normal: 'yellow',
      hard: 'red',
    };

    const onClick = (level: Level) => {
      context.emit('defaultOverlayHide');
      store.dispatch('sound', 'bgm');
      store.dispatch('setPeople', level);
    };

    return {
      colorObj,
      onClick,
    };
  },
});
</script>
