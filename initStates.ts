import { BotPool } from "./BotWraper";
import { GameState } from "./types";

export const initState1: GameState = {
  players: [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
  ],
  board: {
    width: 200,
    height: 200,
  },
  planets: [
    { id: 0, x: 50, y: 50, efficiency: 3, size: 10 },
    { id: 1, x: 150, y: 150, efficiency: 1, size: 10 },
    { id: 2, x: 50, y: 150, efficiency: 1, size: 10 },
    { id: 3, x: 150, y: 50, efficiency: 1, size: 10 },
  ],
  planetsDistances: [
    [0, 14, 10, 10],
    [14, 0, 10, 10],
    [10, 10, 0, 14],
    [10, 10, 14, 0],
  ],
  tick: {
    id: 0,
    planets: [
      { id: 0, player: { id: 0, startingTick: 0 }, population: 10 },
      { id: 1, player: { id: 1, startingTick: 0 }, population: 10 },
      { id: 2, player: null, population: 1 },
      { id: 3, player: null, population: 1 },
    ],
    troops: [],
  },
};

export const bots1 = new BotPool(["./bots/idle_bot.out", "./bots/win_bot.out"]);

export const initState2: GameState = {
  players: [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
  ],
  board: {
    width: 200,
    height: 200,
  },
  planets: [
    { id: 0, x: 10, y: 100, efficiency: 3, size: 10 },
    { id: 1, x: 100, y: 100, efficiency: 4, size: 10 },
    { id: 2, x: 100, y: 190, efficiency: 2, size: 10 },
    { id: 3, x: 190, y: 145, efficiency: 1, size: 10 },
    { id: 4, x: 145, y: 10, efficiency: 2, size: 10 },
  ],
  planetsDistances: [
    [0, 4, 6, 8, 7],
    [4, 0, 4, 5, 5],
    [6, 4, 0, 5, 8],
    [8, 5, 5, 0, 6],
    [7, 5, 8, 6, 0],
  ],
  tick: {
    id: 0,
    planets: [
      { id: 0, player: { id: 0, startingTick: 0 }, population: 10 },
      { id: 1, player: { id: 1, startingTick: 0 }, population: 10 },
      { id: 2, player: null, population: 1 },
      { id: 3, player: { id: 2, startingTick: 0 }, population: 10 },
      { id: 4, player: { id: 3, startingTick: 0 }, population: 10 },
    ],
    troops: [],
  },
};

export const bots2 = new BotPool([
  "./bots/win_bot.out",
  "./bots/idle_bot.out",
  "./bots/win_bot.out",
  "./bots/win_bot.out",
]);

export const initState3: GameState = {
  players: [
    { id: 0, name: "0" },
    { id: 1, name: "1" },
    { id: 2, name: "2" },
  ],
  board: {
    width: 200,
    height: 200,
  },
  planets: [
    { id: 0, x: 10, y: 100, efficiency: 3, size: 10 },
    { id: 1, x: 65, y: 170, efficiency: 1, size: 10 },
    { id: 2, x: 135, y: 170, efficiency: 1, size: 10 },
    { id: 3, x: 190, y: 100, efficiency: 2, size: 10 },
    { id: 4, x: 135, y: 30, efficiency: 2, size: 10 },
    { id: 5, x: 65, y: 30, efficiency: 3, size: 10 },
  ],
  planetsDistances: [
    [0, 4, 6, 8, 6, 4],
    [4, 0, 3, 6, 7, 6],
    [6, 3, 0, 4, 6, 7],
    [8, 6, 4, 0, 4, 6],
    [6, 7, 6, 4, 0, 3],
    [4, 6, 7, 6, 3, 0],
  ],
  tick: {
    id: 0,
    planets: [
      { id: 0, player: { id: 0, startingTick: 0 }, population: 10 },
      { id: 1, player: null, population: 1 },
      { id: 2, player: { id: 1, startingTick: 0 }, population: 10 },
      { id: 3, player: null, population: 1 },
      { id: 4, player: { id: 2, startingTick: 0 }, population: 10 },
      { id: 5, player: null, population: 1 },
    ],
    troops: [],
  },
};

export const bots3 = new BotPool(["./bots/win_bot.out", "./bots/win_bot.out", "./bots/win_bot.out"]);
