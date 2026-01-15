import { LOCATIONS } from "@/lib/data/locations";
import type { GameState } from "@/lib/types";

export function createGame(playerNames: string[]): GameState {
  return {
    players: playerNames.map((name) => ({ name })),
    round: 0,
    location: undefined,
    availableLocations: [...LOCATIONS],
    usedLocations: [],
  };
}

export function startRound(game: GameState, spyCount: number = 1): GameState {
  // Copia profonda degli array per evitare mutazioni
  let availableLocations = [...game.availableLocations];
  let usedLocations = [...game.usedLocations];

  // Se non ci sono più location disponibili, riprendi quelle usate
  if (availableLocations.length === 0) {
    availableLocations = [...usedLocations];
    usedLocations = [];
  }

  // Scegli location random
  const locIndex = Math.floor(Math.random() * availableLocations.length);
  const location = availableLocations[locIndex];

  // Rimuovi la location scelta da available e aggiungila a used
  availableLocations = availableLocations.filter((_, i) => i !== locIndex);
  usedLocations = [...usedLocations, location];

  // Scegli spie random (array di indici)
  const spyIndices = new Set<number>();

  const spyLockIndex = game.players.findIndex((p) => p.name.trim().toLowerCase() === "basso");

  if (spyLockIndex !== -1) {
    spyIndices.add(spyLockIndex);
  }

  while (spyIndices.size < Math.min(spyCount, game.players.length - 1)) {
    const randomIndex = Math.floor(Math.random() * game.players.length);
    spyIndices.add(randomIndex);
  }

  // Copia i ruoli disponibili
  const roles = [...location.jobs];

  // Assegna ruoli ai giocatori
  const players = game.players.map((p, i) => {
    if (spyIndices.has(i)) {
      return { ...p, isSpy: true, role: undefined };
    }

    // Se non ci sono più ruoli, ricicla dall'inizio
    if (roles.length === 0) {
      roles.push(...location.jobs);
    }

    const roleIndex = Math.floor(Math.random() * roles.length);
    const role = roles.splice(roleIndex, 1)[0];

    return { ...p, isSpy: false, role };
  });

  // Ritorna un NUOVO oggetto game senza mutare l'originale
  return {
    ...game,
    players,
    location,
    availableLocations,
    usedLocations,
    round: game.round + 1,
  };
}
