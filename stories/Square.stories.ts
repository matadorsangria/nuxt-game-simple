import { useStore } from '~/composables/store';
import Board from '../components/organisms/Board.vue';
import type { State } from '~/types/original';

export default {
  title: 'Square',
};

const getState = (layer: string): State => ({
  scene: 'movefocus',
  turn: 0,
  board: [
    {
      id: 1,
      personId: 1,
      x: 1,
      y: 1,
      direction: '1',
      width: 160,
      layer,
      style: {
        width: '160px',
        height: '160px',
      },
    },
  ],
  boardStyle: { width: '161px'},
  people: [],
  currentPerson: 1,
  phase: 1,
  level: '',
});

export const Default = () => ({
  components: { Board },
  template: `<board></board>`,
  setup() {
    const store = useStore();
    store.state = getState('');
  },
});

export const Current = () => ({
  components: { Board },
  template: `<board></board>`,
  setup() {
    const store = useStore();
    store.state = getState('current');
  },
});

export const Focused = () => ({
  components: { Board },
  template: `<board></board>`,
  setup() {
    const store = useStore();
    store.state = getState('focused');
  },
});
