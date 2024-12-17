import Vuex from 'vuex';
import Person from '../components/molecules/Person.vue';

const board = [
  {
    id: 1,
    personId: 1,
    x: 1,
    y: 1,
    direction: 1,
    width: 160,
    layer: 'current',
    style: {
      width: '160px',
      height: '160px',
    },
  },
];

const wrapStyle = {
  position: 'relative',
  width: `${board[0].width}px`,
  height: `${board[0].width}px`,
};

const getPerson = (character: string) => {
  return {
    id: 1,
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
  };
};

export default {
  title: 'Person',
};

export const Pengin = () => ({
  components: { Person },
  template: `<div :style="wrapStyle"><person :person="person" :board="board"></person></div>`,
  data: () => ({
    person: getPerson('pengin'),
    board,
    wrapStyle,
  }),
  store: new Vuex.Store({
    actions: {
      moveFocus: () => {},
    },
  }),
});

export const Enemy1 = () => ({
  components: { Person },
  template: `<div :style="wrapStyle"><person :person="person" :board="board"></person></div>`,
  data: () => ({
    person: getPerson('enemy1'),
    board,
    wrapStyle,
  }),
  store: new Vuex.Store({
    actions: {
      moveFocus: () => {},
    },
  }),
});

export const Enemy2 = () => ({
  components: { Person },
  template: `<div :style="wrapStyle"><person :person="person" :board="board"></person></div>`,
  data: () => ({
    person: getPerson('enemy2'),
    board,
    wrapStyle,
  }),
  store: new Vuex.Store({
    actions: {
      moveFocus: () => {},
    },
  }),
});
