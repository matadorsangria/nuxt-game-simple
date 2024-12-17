<template>
  <li :class="className" @click="onClick" />
</template>

<script lang="ts">
import { Square } from 'original';
import {
  defineComponent,
  ref,
  watchEffect,
  useStore,
  PropType,
} from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    square: {
      type: Object as PropType<Square>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const className = ref(props.square.layer);
    const onClick = () => {
      store.dispatch('squareClick', props.square);
    };

    watchEffect(() => {
      className.value = props.square.layer;
    });

    return {
      className,
      onClick,
    };
  },
});
</script>
