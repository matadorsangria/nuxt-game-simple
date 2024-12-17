export type AvailableArr = [[number, number, string]?];
export type AvailableObj = {
  [key: string]: {
    [key: string]: string;
  };
};

export type CurrentPerson = number;
export type Scene = 'move' | 'movefocus' | 'attack' | 'attackfocus';
export type Level = 'easy' | 'normal' | 'hard';

export interface Person {
  id: number;
  name: string;
  x: number;
  y: number;
  direction: string;
  category: number;
  character: string;
  move: number;
  attack: number;
  attackType?: string;
  hp: number;
  maxhp?: number;
  power: number;
  hover: boolean;
  width?: number;
  class?: string | string[];
  classP?: string;
  styleSpan?: {
    backgroundSize: string;
  };
  styleHP?: {
    width: string;
  };
}

export type People = Person[];

export interface Square {
  id?: number;
  personId?: number;
  name?: string;
  x: number;
  y: number;
  direction?: string;
  category?: number;
  character?: string;
  move?: number;
  attack?: number;
  hp?: number;
  power?: number;
  hover?: boolean;
  layer: string | null;
  width: number;
  style: {
    width: string;
    height: string;
  };
}

export type Board = Square[];

export interface State {
  userId?: string;
  board: Board;
  boardStyle: object;
  people: People;
  currentPerson: CurrentPerson;
  turn: number;
  scene: Scene;
  phase: number;
  level: Level | '';
}

export interface ActionContext {
  commit: (name: string, payload?: object | string) => void;
  state: State;
}
