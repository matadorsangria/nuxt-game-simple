import type { Meta, StoryObj } from '@storybook/vue3';
import Person from '../components/molecules/Person.vue';

type Story = StoryObj<typeof Person>

const board = [
  {
    id: 1,
    personId: 1,
    x: 1,
    y: 1,
    direction: 'right',
    width: 160,
    layer: 'current',
    style: {
      width: '160px',
      height: '160px',
    },
  },
];

const getPerson = (character: string) => ({
  id: 2,
  name: character,
  x: 1,
  y: 1,
  direction: 'right',
  category: 0,
  character,
  classP: character,
  move: 4,
  attack: 3,
  hp: 200,
  maxhp: 200,
  power: 4,
  hover: false,
  width: 100,
  styleHP: {
    width: '100px',
  },
  styleSpan: {
    backgroundSize: '100px 100px',
  },
});

export default {
  render: (args) => ({
    components: { Person },
    template: '<Person v-bind="args" />',
    setup() {
      return { args };
    },
  }),
} as Meta<typeof Person>;

export const Pengin: Story = {
  args: {
    person: getPerson('pengin'),
    board,
  }
};

export const Enemy1: Story = {
  args: {
    person: getPerson('enemy1'),
    board,
  }
};

export const Enemy2: Story = {
  args: {
    person: getPerson('enemy2'),
    board,
  }
};
