export type PlayerID = number;

type Player = {
  id: PlayerID;
  name: string;
};

type PlanetID = number;

type Planet = {
  id: PlanetID;
  x: number;
  y: number;
  efficiency: number;
  // just for visualizer
  size: number;
};

export type Tick = {
  id: number;
  planets: {
    id: PlanetID;
    player: { id: PlayerID; startingTick: number } | null;
    population: number; // It can also have population without player
  }[];
  troops: {
    id: number;
    from: PlanetID;
    to: PlanetID;
    player: PlayerID;
    size: number;
    endTick: number;
  }[];
  //    error: [{tick: number, playerID: PlayerID, error: string}]; //TODO: implement on output to frontend
};

export type TickVisualizer = {
  planets: {
    id: PlanetID;
    player: PlayerID | null;
    population: number; // It can also have population without player
  }[];
  troops: {
    id: number;
    from: PlanetID;
    to: PlanetID;
    player: PlayerID;
    size: number;
    distance: number;
    progress: number;
  }[];
  //    error: [{tick: number, playerID: PlayerID, error: string}]; //TODO: implement on output to frontend
};

// hány troop
// from, to, size

export type GameState = {
  players: Player[];
  board: { width: number; height: number };
  planets: Planet[];
  planetsDistances: number[][];
  tick: Tick;
};

export type GameStateVis = {
  init: {
    players: Player[];
    board: { width: number; height: number };
    planets: {
      id: PlanetID;
      x: number;
      y: number;
      size: number;
      player: PlayerID | null;
    }[];
  };
  ticks: TickVisualizer[];
};

export type UserStep = {
  playerID: PlayerID;
  from: PlanetID;
  to: PlanetID;
  size: number;
}[];
