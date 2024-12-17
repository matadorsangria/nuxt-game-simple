import Board from '../components/organisms/Board.vue';

export default {
  title: 'Square',
};

export const Default = () => ({
  components: { Board },
  template: `<board></board>`,
});

export const Current = () => ({
  components: { Board },
  template: `<board></board>`,
  // store: new Vuex.Store({
  //   state: {
  //     scene: 'movefocus',
  //     turn: 0,
  //     board: [
  //       {
  //         id: 1,
  //         personId: 1,
  //         x: 1,
  //         y: 1,
  //         direction: 1,
  //         width: 160,
  //         layer: 'current',
  //         style: {
  //           width: '160px',
  //           height: '160px',
  //         },
  //       },
  //     ],
  //   },
  //   actions: {
  //     squareClick: () => {},
  //   },
  // }),
});

export const Focused = () => ({
  components: { Board },
  template: `<board></board>`,
  // store: new Vuex.Store({
  //   state: {
  //     scene: 'movefocus',
  //     turn: 0,
  //     board: [
  //       {
  //         id: 1,
  //         personId: 1,
  //         x: 1,
  //         y: 1,
  //         direction: 1,
  //         width: 160,
  //         layer: 'focused',
  //         style: {
  //           width: '160px',
  //           height: '160px',
  //         },
  //       },
  //     ],
  //   },
  //   actions: {
  //     squareClick: () => {},
  //   },
  // }),
});
