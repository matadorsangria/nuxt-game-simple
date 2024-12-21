import type { Meta, StoryObj } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';
import type { State } from '~/types/original';
import { useStore } from '~/composables/store';
import Board from '../components/organisms/Board.vue';


type Story = StoryObj<typeof Board>

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

export default {
  args: {
    onClick: action('click'),
  },
} as Meta<typeof Board>;

export const Default: Story = {
  render: (args) => ({
    components: { Board },
    template: '<Board v-bind="args" />',
    setup() {
      const store = useStore();
      store.state = getState('');

      return { args };
    },
  }),
};

export const Current: Story = {
  render: (args) => ({
    components: { Board },
    template: '<Board v-bind="args" />',
    setup() {
      const store = useStore();
      store.state = getState('current');

      return { args };
    },
  }),
};

export const Focused: Story = {
  render: (args) => ({
    components: { Board },
    template: '<Board v-bind="args" />',
    setup() {
      const store = useStore();
      store.state = getState('focused');

      return { args };
    },
  }),
};
