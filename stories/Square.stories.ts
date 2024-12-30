import type { Meta, StoryObj } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';
import Square from '../components/molecules/Square.vue';

type Story = StoryObj<typeof Square>

const getSquare = (layer: string) => ({
  id: 1,
  personId: 1,
  x: 1,
  y: 1,
  width: 160,
  layer,
  style: {
    width: '160px',
    height: '160px',
  },
});

export default {
  render: (args) => ({
    components: { Square },
    template: `<div style="box-sizing: border-box; border: 1px solid #999; border-width: 0 1px 1px 0; width: 161px;">
      <Square v-bind="args" />
    </div>`,
    setup() {
      return { args };
    },
  }),
  args: {
    onClick: action('click'),
  },
} as Meta<typeof Square>;

export const Default: Story = {
  args: {
    square: getSquare(''),
  }
};

export const Current: Story = {
  args: {
    square: getSquare('current'),
  }
};

export const Focused: Story = {
  args: {
    square: getSquare('focused'),
  }
};
