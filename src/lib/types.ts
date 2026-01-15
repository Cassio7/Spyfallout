export type Player = {
  name: string;
  role?: string;
  isSpy?: boolean;
};

export type Location = {
  name: string;
  jobs: string[];
};

export type GameState = {
  players: Player[];
  location?: Location;
  round: number;
  availableLocations: Location[];
  usedLocations: Location[];
};
