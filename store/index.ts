import {
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
  ActionContext,
} from 'original';
import * as firebaseui from 'firebaseui';
import firebase from '~/plugins/firebase';
const db = firebase.firestore();

window.AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx: AudioContext | null = null;
const boardSize = [5, 4];
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
const initialState: State = {
  userId: '',
  board: [],
  boardStyle: {},
  people: [],
  currentPerson: 1,
  turn: 0,
  scene: 'movefocus',
  phase: 1,
  level: '',
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
// function getSquareIndexFromPosition(board, x, y) {
//   return board.findIndex((s) => s.x === x && s.y === y);
// }
function getPersonFromId(people: People, id: number | undefined) {
  return people.filter((p) => p.id === id)[0];
}
function getPersonFromSquare(people: People, s: Square) {
  return getPersonFromId(people, s.personId);
}
function getPersonIndexFromId(people: People, id: number) {
  return people.findIndex((p) => p.id === id);
}
function sound(filename: string) {
  // Audio 用の buffer を読み込む
  const getAudioBuffer = function (
    url: string,
    fn: (buffer: AudioBuffer) => void
  ) {
    if (audioCtx === null) {
      audioCtx = new AudioContext();
    }

    const req = new XMLHttpRequest();
    // array buffer を指定
    req.responseType = 'arraybuffer';

    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        if (req.status === 0 || req.status === 200) {
          // array buffer を audio buffer に変換
          audioCtx!.decodeAudioData(req.response, function (buffer) {
            // コールバックを実行
            fn(buffer);
          });
        }
      }
    };

    req.open('GET', url, true);
    req.send('');
  };

  // サウンドを再生
  const playSound = function (buffer: AudioBuffer) {
    if (audioCtx!.state === 'closed') {
      audioCtx = null;
      audioCtx = new AudioContext();
    }
    // source を作成
    const source = audioCtx!.createBufferSource();
    // buffer をセット
    source.buffer = buffer;
    // audioCtx に connect
    source.connect(audioCtx!.destination);
    // 再生
    source.start(0);
  };

  getAudioBuffer('audio/' + filename + '.mp3', function (buffer: AudioBuffer) {
    playSound(buffer);
  });
}

function setUserData(state: State) {
  db.collection('users')
    .doc(state.userId)
    .set(
      {
        [state.level]: state,
      },
      { merge: true }
    )
    .then(function () {
      console.log('user data is changed.');
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
}
function resetUserData(state: State) {
  db.collection('users')
    .doc(state.userId)
    .set(
      {
        [state.level]: initialState,
      },
      { merge: true }
    )
    .then(function () {
      console.log('user data is reset.');
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
}

export const state = () => ({ ...initialState });

export const getters = {
  levels() {
    return Object.keys(peopleData);
  },
};

// 状態を変更する処理は mutationとしてexportする
export const mutations = {
  setUserId(state: State, uid: string) {
    state.userId = uid;
  },
  setBoard(state: State) {
    const squareWidth = 160;
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
    state.board = board;
    state.boardStyle = { width: boardSize[0] * squareWidth + 1 + 'px' };
  },
  setPeople(state: State, payload: { newState: State; level: Level }) {
    const { newState, level } = payload;
    state.level = level;

    const people =
      newState && newState.people && newState.people.length
        ? newState.people
        : peopleData[level];

    people.forEach((p: Person) => {
      p.maxhp = p.hp;
    });
    people.forEach((p: Person) => {
      state.board.filter((s) => s.x === p.x && s.y === p.y)[0].personId = p.id;
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
    state.people = people;
    setUserData(state);
  },
  moveFocus(state: State, person: Person) {
    state.board.forEach((s) => {
      s.layer = null;
    });
    state.people.forEach((p) => {
      p.class = [];
    });
    getAvailableArr(state, person, 'move').forEach((pos) => {
      if (!pos) return;
      getSquareFromPosition(state.board, pos[0], pos[1]).layer = pos[2];
    });
    state.turn = person.category;
    state.scene = 'movefocus';
    person.class = 'current';
    setUserData(state);
  },
  move(state: State, target: Square) {
    state.board.forEach((s) => {
      s.layer = null;
    });
    const p = getPersonFromId(state.people, state.currentPerson);
    let phase = state.phase;
    if (state.currentPerson === state.people.length - 1) {
      phase++;
    }
    delete getSquareFromPosition(state.board, p.x, p.y).personId;
    p.x = target.x;
    p.y = target.y;
    getSquareFromPosition(state.board, p.x, p.y).personId = p.id;
    state.scene = 'move';
    state.phase = phase;
  },
  attackFocus(state: State, person: Person) {
    state.board.forEach((s) => {
      s.layer = null;
    });
    getAvailableArr(state, person, 'attack').forEach((pos) => {
      if (!pos) return;
      getSquareFromPosition(state.board, pos[0], pos[1]).layer = pos[2];
    });
    person.class = 'current';
    state.scene = 'attackfocus';
    setUserData(state);
  },
  attack(state: State, action: { me: CurrentPerson; target: Square | null }) {
    attackAsync().then(function () {
      const currentPersonId = getPersonIndexFromId(
        state.people,
        state.currentPerson
      );
      let currentPerson;
      if (currentPersonId !== state.people.length - 1) {
        currentPerson = state.people[currentPersonId + 1].id;
      } else {
        currentPerson = 1;
      }
      state.currentPerson = currentPerson;
    });

    function attackAsync() {
      return new Promise(function (resolve) {
        if (action.target !== null) {
          const target = getPersonFromSquare(state.people, action.target);
          const _me = getPersonFromId(state.people, action.me);
          const _class = _me.attackType === 'fire' ? 'burned' : 'attacked';
          sound(_class);
          target.hp -= _me.power;
          if (target.x < _me.x) {
            _me.direction = 'left';
          } else if (target.x > _me.x) {
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
              state.people.splice(
                getPersonIndexFromId(state.people, target.id),
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
  },
};

export const actions = {
  showLoginForm() {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
      signInSuccessUrl: '/',
      signInOptions: [
        // List of OAuth providers supported.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    });
  },
  setUserId({ commit }: ActionContext, uid: string) {
    commit('setUserId', uid);
  },
  setBoard({ commit }: ActionContext) {
    commit('setBoard');
  },
  setPeople({ commit, state }: ActionContext, level: Level) {
    db.collection('users')
      .doc(state.userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const _state = doc.data()![level];
          if (_state && _state.level !== '') {
            console.log('user data exists.');
            commit('setPeople', {
              newState: _state,
              level: _state.level,
            });
          } else {
            console.log('user data is initialized.');
            commit('setPeople', {
              newState: null,
              level,
            });
          }
        } else {
          console.log('user data is null.');
          commit('setPeople', {
            newState: null,
            level,
          });
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  },
  moveFocus({ commit }: ActionContext, person: Person) {
    commit('moveFocus', person);
  },
  squareClick({ commit, state }: ActionContext, square: Square) {
    if (state.scene === 'movefocus') {
      if (square.layer === 'focused') {
        commit('move', square);
        setTimeout(function () {
          _attackFocus(state);
        }, 800);
      } else if (square.layer === 'current') {
        _attackFocus(state);
      }
    } else if (square.layer === (state.turn ? 'us' : 'enemy')) {
      commit('attack', { me: state.currentPerson, target: square });
      const person = getPersonFromId(state.people, state.currentPerson);
      const _attackTime = person.attackType === 'fire' ? 1000 : 0;
      setTimeout(function () {
        const nextPerson = getPersonFromId(state.people, state.currentPerson);
        const categoryArr = [0, 0];
        state.people.forEach((p) => {
          categoryArr[p.category]++;
        });
        if (categoryArr[0] === 0) {
          resetUserData(state);
          audioCtx!.close();
          audioCtx = null;
          alert('YOU LOSE...');
          const $restart = <HTMLElement>document.querySelector('.restart');
          $restart.style.display = 'flex';
        } else if (categoryArr[1] === 0) {
          resetUserData(state);
          audioCtx!.close().then(function () {
            sound('win');
            setTimeout(function () {
              alert('YOU WIN!');
              const $restart = <HTMLElement>document.querySelector('.restart');
              $restart.style.display = 'flex';
            }, 500);
          });
        } else {
          _next(nextPerson);
        }
      }, _attackTime + 600);
    }

    function _attackFocus(state: State) {
      const person = getPersonFromId(state.people, state.currentPerson);
      const attackArea = getAvailableArr(state, person, 'attack');
      commit('attackFocus', person);
      if (
        attackArea.filter(
          (pos) => pos && pos[2] === (state.turn ? 'us' : 'enemy')
        )[0] === undefined
      ) {
        commit('attack', { me: state.currentPerson, target: null });
        setTimeout(function () {
          const nextPerson = getPersonFromId(state.people, state.currentPerson);
          _next(nextPerson);
        }, 200);
      } else if (person.category === 1) {
        setTimeout(function () {
          const focusedList = document.querySelectorAll('.board li.us');
          const num = Math.floor(focusedList.length * Math.random());
          const $elem = <HTMLElement>focusedList[num];
          $elem.click();
        }, 500);
      }
    }

    function _next(nextPerson: Person) {
      commit('moveFocus', nextPerson);
      if (nextPerson.category === 1) {
        setTimeout(function () {
          const focusedList = document.querySelectorAll('.board li.focused');
          const num = Math.floor(focusedList.length * Math.random());
          const $elem = <HTMLElement>focusedList[num];
          $elem.click();
        }, 500);
      }
    }
  },
  // eslint-disable-next-line no-empty-pattern
  sound({}: ActionContext, filename: string) {
    sound(filename);
  },
  firebaseSignIn() {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log('User is signed in.');
          resolve(user);
        } else {
          console.log('No user is signed in.');
          resolve(null);
        }
      });
    });
  },
  firebaseSignOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log('Sign-out successful.');
        window.location.href = '/';
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

export const strict = false;
