export type Player = {
  name: string;
  role?: string;
  isSpy?: boolean;
};

export type Job = {
  name:string;
  isRepeatable: boolean;
}

export type Location = {
  name: string;
  jobs: Job[];
};

export type GameState = {
  players: Player[];
  location?: Location;
  round: number;
  availableLocations: Location[];
  usedLocations: Location[];
};
