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

  // Easter egg: "Cassio" non è mai spia
  const cassioIndex = game.players.findIndex((p) => p.name.trim().toLowerCase() === "cassio");
  const excludedIndices = cassioIndex !== -1 ? [cassioIndex] : [];

  while (spyIndices.size < Math.min(spyCount, game.players.length - 1)) {
    const randomIndex = Math.floor(Math.random() * game.players.length);
    // Salta Cassio se presente
    if (!excludedIndices.includes(randomIndex)) {
      spyIndices.add(randomIndex);
    }
  }

  // Copia TUTTI i ruoli disponibili (unici + ripetibili)
  const availableRoles = [...location.jobs];

  // Assegna ruoli ai giocatori
  const players = game.players.map((p, i) => {
    if (spyIndices.has(i)) {
      return { ...p, isSpy: true, role: undefined };
    }

    let role: string;

    // Se ci sono ancora ruoli disponibili, estrai random
    if (availableRoles.length > 0) {
      const roleIndex = Math.floor(Math.random() * availableRoles.length);
      const selectedJob = availableRoles.splice(roleIndex, 1)[0];
      role = selectedJob.name;
    }
    // Quando finiscono, ricicla SOLO i ruoli ripetibili
    else {
      const repeatableJobs = location.jobs.filter((j) => j.isRepeatable);
      if (repeatableJobs.length > 0) {
        const roleIndex = Math.floor(Math.random() * repeatableJobs.length);
        role = repeatableJobs[roleIndex].name;
      } else {
        // Fallback estremo: se non ci sono ruoli ripetibili, usa il primo disponibile
        role = location.jobs[0].name;
      }
    }

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
