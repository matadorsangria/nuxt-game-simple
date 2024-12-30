import type { Meta, StoryObj } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';
import type { Level, State } from '~/types/original';
import { useStore } from '~/composables/store';
import StartButton from '../components/molecules/StartButton.vue';

type Story = StoryObj<typeof StartButton>

const getState = (level: Level): State => ({
  scene: 'movefocus',
  turn: 0,
  board: [
    {
      id: 1,
      personId: 1,
      x: 1,
      y: 1,
      width: 160,
      layer: '',
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
  level,
});

export default {
  render: (args) => ({
    components: { StartButton },
    template: '<StartButton v-bind="args" />',
    setup() {
      const store = useStore();
      store.state = getState(args.level);

      return { args };
    },
  }),
  args: {
    onClick: action('click'),
  },
} as Meta<typeof StartButton>;

export const Easy: Story = {
  args: {
    level: 'easy',
  }
};

export const Normal: Story = {
  args: {
    level: 'normal',
  }
};

export const Hard: Story = {
  args: {
    level: 'hard',
  }
};
