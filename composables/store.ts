import { ref } from 'vue';
import { defineStore } from 'pinia';
import type {
  AvailableArr,
  AvailableObj,
  CurrentPerson,
  Scene,
  Level,
  Person,
  People,
  Square,
  Board,
  State,
} from 'original';

const boardSize = [5, 4];
export const squareWidth = 160;
const personWidth = 100;
const peopleData = {
  easy: [
    {
      id: 1,
      name: 'pengin',
      x: 1,
      y: 1,
      direction: 'right',
      category: 0,
      character: 'pengin',
      move: 4,
      attack: 3,
      hp: 200,
      power: 4,
      hover: false,
    },
    {
      id: 2,
      name: 'enemy1',
      x: boardSize[0],
      y: boardSize[1],
      direction: 'left',
      category: 1,
      character: 'enemy1',
      move: 3,
      attack: 4,
      attackType: 'fire',
      hp: 10,
      power: 60,
      hover: false,
    },
  ],
  normal: [
    {
      id: 1,
      name: 'pengin',
      x: 1,
      y: 1,
      direction: 'right',
      category: 0,
      character: 'pengin',
      move: 4,
      attack: 3,
      hp: 200,
      power: 4,
      hover: false,
    },
    {
      id: 2,
      name: 'enemy1',
      x: boardSize[0],
      y: boardSize[1],
      direction: 'left',
      category: 1,
      character: 'enemy1',
      move: 3,
      attack: 4,
      attackType: 'fire',
      hp: 10,
      power: 60,
      hover: false,
    },
    {
      id: 3,
      name: 'enemy2',
      x: boardSize[0] - 1,
      y: boardSize[1],
      direction: 'left',
      category: 1,
      character: 'enemy2',
      move: 3,
      attack: 2,
      hp: 5,
      power: 15,
      hover: false,
    },
  ],
  hard: [
    {
      id: 1,
      name: 'pengin',
      x: 1,
      y: 1,
      direction: 'right',
      category: 0,
      character: 'pengin',
      move: 4,
      attack: 3,
      hp: 200,
      power: 4,
      hover: false,
    },
    {
      id: 2,
      name: 'enemy1',
      x: boardSize[0],
      y: boardSize[1],
      direction: 'left',
      category: 1,
      character: 'enemy1',
      move: 3,
      attack: 4,
      attackType: 'fire',
      hp: 10,
      power: 60,
      hover: false,
    },
    {
      id: 3,
      name: 'enemy2',
      x: boardSize[0] - 1,
      y: boardSize[1],
      direction: 'left',
      category: 1,
      character: 'enemy2',
      move: 3,
      attack: 2,
      hp: 5,
      power: 15,
      hover: false,
    },
    {
      id: 4,
      name: 'enemy3',
      x: boardSize[0],
      y: boardSize[1] - 1,
      direction: 'left',
      category: 1,
      character: 'enemy3',
      move: 3,
      attack: 2,
      hp: 5,
      power: 15,
      hover: false,
    },
  ],
};

function getAvailableArr(state: State, p: Person, scene: Scene) {
  const directionArr = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let availableArr: AvailableArr = [];
  const availableObj: AvailableObj = {};
  const distance = scene === 'move' ? p.move : p.attack;
  for (let i = 0; i < distance; i++) {
    if (i === 0) {
      setAvailableObj(p.x, p.y);
    } else {
      availableArr.forEach((pos) => {
        if (pos !== undefined) {
          setAvailableObj(pos[0], pos && pos[1]);
        }
      });
    }
    calcAvailable();
  }

  function setAvailableObj(startX: number, startY: number) {
    for (let j = 0; j < directionArr.length; j++) {
      const x = startX + directionArr[j][0];
      const y = startY + directionArr[j][1];
      const _x = String(x);
      const _y = String(y);

      if (x > 0 && x <= boardSize[0] && y > 0 && y <= boardSize[1]) {
        if (!availableObj[_x]) {
          availableObj[_x] = {};
        }
        if (!availableObj[_x][_y]) {
          const person = getPersonFromSquare(
            state.people,
            getSquareFromPosition(state.board, x, y)
          );
          if (person !== undefined) {
            availableObj[_x][_y] = person.category ? 'enemy' : 'us';
          } else {
            availableObj[_x][_y] = 'focused';
          }
        }
      }
    }
    availableObj[p.x][p.y] = 'current';
  }

  function calcAvailable() {
    availableArr = [];
    Object.keys(availableObj).forEach((x) => {
      Object.keys(availableObj[x]).forEach((y) => {
        availableArr.push([Number(x), Number(y), availableObj[x][y]]);
      });
    });
  }

  return availableArr;
}

function getSquareFromPosition(board: Board, x: number, y: number) {
  return board.filter((s) => s.x === x && s.y === y)[0];
}
function getPersonFromId(people: People, id: number | undefined) {
  return people.filter((p) => p.id === id)[0];
}
function getPersonFromSquare(people: People, s: Square) {
  return getPersonFromId(people, s.personId);
}
function getPersonIndexFromId(people: People, id: number) {
  return people.findIndex((p) => p.id === id);
}

export const useStore = defineStore('store', () => {
  const state = ref<State>({
    userId: '',
    board: [],
    boardStyle: {},
    people: [],
    currentPerson: 1,
    turn: 0,
    scene: 'movefocus',
    phase: 1,
    level: '',
  })
  const levels = computed(() => Object.keys(peopleData) as Level[]);
  const setUserId = (uid: string) => {
    state.value.userId = uid;
  };
  const setBoard = () => {
    const board = [];
    let counter = 0;
    for (let i = 1; i <= boardSize[1]; i++) {
      for (let j = 1; j <= boardSize[0]; j++) {
        board.push({
          id: ++counter,
          x: j,
          y: i,
          layer: null,
          width: squareWidth,
          style: {
            width: squareWidth + 'px',
            height: squareWidth + 'px',
          },
        });
      }
    }
    state.value.board = board;
    state.value.boardStyle = { width: boardSize[0] * squareWidth + 1 + 'px' };
  };
  const setPeople = (level: Level) => {
    state.value.level = level;

    const people = peopleData[level];

    people.forEach((p: Person) => {
      p.maxhp = p.hp;
    });
    people.forEach((p: Person) => {
      const squaresWithPerson = state.value.board.filter((s) => s.x === p.x && s.y === p.y);
      if (squaresWithPerson.length === 0) {
        return;
      }
      squaresWithPerson[0].personId = p.id;
      p.width = personWidth;
      p.class = '';
      p.classP = p.character;
      p.styleSpan = {
        backgroundSize:
          String(personWidth) + 'px ' + String(personWidth) + 'px',
      };
      p.styleHP = {
        width: String(personWidth) + 'px',
      };
    });
    state.value.people = people;
  };
  const moveFocus = (person: Person) => {
    state.value.board.forEach((s) => {
      s.layer = null;
    });
    state.value.people.forEach((p) => {
      p.class = [];
    });
    getAvailableArr(state.value, person, 'move').forEach((pos) => {
      if (!pos) return;
      getSquareFromPosition(state.value.board, pos[0], pos[1]).layer = pos[2];
    });
    state.value.turn = person.category;
    state.value.scene = 'movefocus';
    person.class = 'current';
  };
  const move = (target: Square) => {
    const p = getPersonFromId(state.value.people, state.value.currentPerson);

    if (!p) {
      return;
    }

    state.value.board.forEach((s) => {
      s.layer = null;
    });

    let phase = state.value.phase;
    if (state.value.currentPerson === state.value.people.length - 1) {
      phase++;
    }
    delete getSquareFromPosition(state.value.board, p.x, p.y).personId;
    p.x = target.x;
    p.y = target.y;
    getSquareFromPosition(state.value.board, p.x, p.y).personId = p.id;
    state.value.scene = 'move';
    state.value.phase = phase;
  };
  const attackFocus = (person: Person) => {
    state.value.board.forEach((s) => {
      s.layer = null;
    });
    getAvailableArr(state.value, person, 'attack').forEach((pos) => {
      if (!pos) return;
      getSquareFromPosition(state.value.board, pos[0], pos[1]).layer = pos[2];
    });
    person.class = 'current';
    state.value.scene = 'attackfocus';
  };
  const attack = (action: { me: CurrentPerson; target: Square | null }) => {
    attackAsync().then(function () {
      const currentPersonId = getPersonIndexFromId(
        state.value.people,
        state.value.currentPerson
      );
      let currentPerson;
      if (currentPersonId !== state.value.people.length - 1) {
        currentPerson = state.value.people[currentPersonId + 1].id;
      } else {
        currentPerson = 1;
      }
      state.value.currentPerson = currentPerson;
    });

    function attackAsync() {
      console.log('attackAsync');
      return new Promise(function (resolve) {
        if (action.target !== null) {
          const target = getPersonFromSquare(state.value.people, action.target);
          const _me = getPersonFromId(state.value.people, action.me);
          const _class = _me.attackType === 'fire' ? 'burned' : 'attacked';
          target.hp -= _me.power;
          if (target.x < _me.x) {
            console.log('left', _me.direction);
            _me.direction = 'left';
          } else if (target.x > _me.x) {
            console.log('right', _me.direction);
            _me.direction = 'right';
          }
          if (target.hp > 0) {
            target.class = _class;
            resolve(null);
          } else {
            const _deadClass = _me.attackType === 'fire' ? 'burnDead' : 'dead';
            const _time = _deadClass === 'burnDead' ? 1400 : 400;
            target.class = _class + ' ' + _deadClass;
            setTimeout(function () {
              state.value.people.splice(
                getPersonIndexFromId(state.value.people, target.id),
                1
              );
              resolve(null);
            }, _time);
          }
        } else {
          resolve(null);
        }
      });
    }
  };
  const squareClick = (square: Square) => {
    if (state.value.scene === 'movefocus') {
      if (square.layer === 'focused') {
        move(square);
        setTimeout(function () {
          _attackFocus(state.value);
        }, 800);
      } else if (square.layer === 'current') {
        _attackFocus(state.value);
      }
    } else if (square.layer === (state.value.turn ? 'us' : 'enemy')) {
      console.log('fuga');
      attack({ me: state.value.currentPerson, target: square });
      const person = getPersonFromId(state.value.people, state.value.currentPerson);
      const _attackTime = person.attackType === 'fire' ? 1000 : 0;
      setTimeout(function () {
        const nextPerson = getPersonFromId(state.value.people, state.value.currentPerson);
        const categoryArr = [0, 0];
        state.value.people.forEach((p) => {
          categoryArr[p.category]++;
        });
        if (categoryArr[0] === 0) {
          alert('YOU LOSE...');
          const $restart = <HTMLElement>document.querySelector('.restart');
          $restart.style.display = 'flex';
        } else if (categoryArr[1] === 0) {
          setTimeout(function () {
            alert('YOU WIN!');
            const $restart = <HTMLElement>document.querySelector('.restart');
            $restart.style.display = 'flex';
          }, 500);
        } else {
          _next(nextPerson);
        }
      }, _attackTime + 600);
    }

    function _attackFocus(state: State) {
      const person = getPersonFromId(state.people, state.currentPerson);

      if (!person) {
        return;
      }

      const attackArea = getAvailableArr(state, person, 'attack');
      attackFocus(person);
      if (
        attackArea.filter(
          (pos) => pos && pos[2] === (state.turn ? 'us' : 'enemy')
        )[0] === undefined
      ) {
        console.log('hoge');
        attack({ me: state.currentPerson, target: null });
        setTimeout(function () {
          const nextPerson = getPersonFromId(state.people, state.currentPerson);
          _next(nextPerson);
        }, 200);
      } else if (person.category === 1) {
        setTimeout(function () {
          const focusedList = document.querySelectorAll('.board .us');
          const num = Math.floor(focusedList.length * Math.random());
          const $elem = <HTMLElement>focusedList[num];
          $elem.click();
        }, 500);
      }
    }

    function _next(nextPerson: Person) {
      moveFocus(nextPerson);
      if (nextPerson.category === 1) {
        setTimeout(function () {
          const focusedList = document.querySelectorAll('.board .focused');
          const num = Math.floor(focusedList.length * Math.random());
          const $elem = <HTMLElement>focusedList[num];
          $elem.click();
        }, 500);
      }
    }
  };

  return { state, levels, setUserId, setBoard, moveFocus, setPeople, squareClick };
})