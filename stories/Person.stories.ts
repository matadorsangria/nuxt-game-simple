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

const getPerson = (character: string) => {
  return {
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
  };
};

export default {
  title: 'Person',
};

export const Pengin = () => ({
  components: { Person },
  template: `<person :person="person" :board="board"></person>`,
  setup() {
    return {
      person: getPerson('pengin'),
      board,
    }
  },
});

export const Enemy1 = () => ({
  components: { Person },
  template: `<person :person="person" :board="board"></person>`,
  setup() {
    return {
      person: getPerson('enemy1'),
      board,
    }
  },
});

export const Enemy2 = () => ({
  components: { Person },
  template: `<person :person="person" :board="board"></person>`,
  setup() {
    return {
      person: getPerson('enemy2'),
      board,
    }
  },
});
