import StartButton from '../components/molecules/StartButton.vue';

export default {
  title: 'Button',
};

export const Easy = () => ({
  components: { StartButton },
  template: `<start-button level="easy"></start-button>`,
});

export const Normal = () => ({
  components: { StartButton },
  template: `<start-button level="normal"></start-button>`,
});

export const Hard = () => ({
  components: { StartButton },
  template: `<start-button level="hard"></start-button>`,
});

export const Retry = () => ({
  template: `<v-btn>Retry</v-btn>`,
});
