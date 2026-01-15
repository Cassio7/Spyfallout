import { useState, useRef, useEffect } from "react";
import { createGame, startRound } from "@/lib/game/gameLogic";
import type { GameState, Player } from "@/lib/types";

export default function WelcomeGame() {
  const [playerCount, setPlayerCount] = useState(3);
  const [spyCount, setSpyCount] = useState(1);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(3).fill(""));
  const [game, setGame] = useState<GameState | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [revealedPlayers, setRevealedPlayers] = useState<Set<string>>(new Set());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const playersContainerRef = useRef<HTMLDivElement>(null);

  const handlePlayerCountChange = (count: number) => {
    const prevHeight = playersContainerRef.current?.scrollHeight;
    setPlayerCount(count);
    setPlayerNames(Array(count).fill(""));

    // Limita il numero di spie al numero di giocatori - 1
    if (spyCount >= count) {
      setSpyCount(Math.max(1, count - 1));
    }
  };

  useEffect(() => {
    // Smooth scroll solo per il container dei giocatori
    if (playersContainerRef.current) {
      playersContainerRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [playerNames.length]);

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();

    if (playerNames.some((n) => !n.trim())) {
      setErrorMessage("Inserisci tutti i nomi dei giocatori!");
      return;
    }

    if (spyCount >= playerNames.length) {
      setErrorMessage("Il numero di spie deve essere inferiore al numero di giocatori");
      return;
    }

    const newGame = createGame(playerNames.map((n) => n.trim()));
    setGame(newGame);
    setGameStarted(true);
  };

  const handleStartRound = () => {
    if (!game) return;

    const updatedGame = startRound(game, spyCount);
    setGame(updatedGame);
    setRevealedPlayers(new Set());
  };

  const openPlayerModal = (player: Player) => {
    setSelectedPlayer(player);
  };

  const closeModal = () => {
    if (selectedPlayer) {
      setRevealedPlayers((prev) => new Set(prev).add(selectedPlayer.name));
    }
    setSelectedPlayer(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-2xl shadow-xl">
        <div className="flex justify-center mb-6">
          <img src="/spyfallout.png" alt="Spyfallout Logo" className="w-60 h-60" />
        </div>

        {!gameStarted ? (
          <form onSubmit={handleStartGame} className="space-y-4">
            <div className="flex justify-between items-center">
              <label>Numero giocatori</label>
              <input
                type="number"
                min="2"
                max="10"
                value={playerCount}
                onChange={(e) => handlePlayerCountChange(Number(e.target.value))}
                className="w-16 bg-gray-700 rounded px-2 py-1 text-center"
              />
            </div>

            <div className="flex justify-between items-center">
              <label>Numero spie</label>
              <input
                type="number"
                min="1"
                max={Math.max(1, playerCount - 1)}
                value={spyCount}
                onChange={(e) => setSpyCount(Number(e.target.value))}
                className="w-16 bg-gray-700 rounded px-2 py-1 text-center"
              />
            </div>

            <div ref={playersContainerRef} className="space-y-2">
              {playerNames.map((name, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Giocatore ${i + 1}`}
                  value={name}
                  onChange={(e) => handleNameChange(i, e.target.value)}
                  className="w-full bg-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
                />
              ))}
            </div>

            <button type="submit" className="w-full bg-green-600 hover:bg-green-500 transition rounded-lg py-2">
              Inizia partita
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-center font-semibold">{game?.round ? `Round ${game.round}` : "Partita pronta"}</p>

            <div className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
              <label>Numero spie per prossimo round</label>
              <input
                type="number"
                min="1"
                max={Math.max(1, game?.players.length ? game.players.length - 1 : 1)}
                value={spyCount}
                onChange={(e) => setSpyCount(Number(e.target.value))}
                className="w-16 bg-gray-600 rounded px-2 py-1 text-center"
              />
            </div>

            <button onClick={handleStartRound} className="w-full bg-blue-600 hover:bg-blue-500 transition rounded-lg py-2">
              Avvia round
            </button>

            {game?.players && game.location && (
              <div className="space-y-2">
                <p className="text-sm text-gray-400 text-center mb-3">👆 Clicca sul tuo nome per vedere il tuo ruolo</p>
                {game.players.map((p, i) => {
                  const hasRevealed = revealedPlayers.has(p.name);
                  return (
                    <button
                      key={i}
                      onClick={() => !hasRevealed && openPlayerModal(p)}
                      disabled={hasRevealed}
                      className={`w-full p-4 rounded-lg text-left transition ${
                        hasRevealed ? "bg-gray-900 opacity-50 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      <strong className="text-lg">{p.name}</strong>
                      <span className={`ml-2 ${hasRevealed ? "text-green-500" : "text-gray-400"}`}>
                        {hasRevealed ? "✓ Ruolo visto" : "→ Tocca per rivelare"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL ERRORE */}
      {errorMessage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setErrorMessage(null)}
        >
          <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">⚠️</div>
              <p className="text-lg text-red-400 font-semibold">{errorMessage}</p>
            </div>

            <button
              onClick={() => setErrorMessage(null)}
              className="w-full bg-red-600 hover:bg-red-500 transition rounded-lg py-2 font-semibold"
            >
              OK, ho capito
            </button>
          </div>
        </div>
      )}

      {/* MODAL GIOCATORE */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-3xl font-bold text-center mb-6">{selectedPlayer.name}</h2>

            <div className="bg-gray-900 p-6 rounded-xl mb-6 text-center">
              {selectedPlayer.isSpy ? (
                <div className="space-y-3">
                  <div className="text-6xl">🕵️</div>
                  <p className="text-2xl font-bold text-red-400">Sei la SPIA!</p>
                  <p className="text-gray-400 text-sm mt-2">Scopri la location senza farti scoprire</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-5xl mb-2">📍</div>
                  <p className="text-xl text-blue-400 font-semibold">{game?.location?.name}</p>
                  <div className="text-4xl my-3">🎭</div>
                  <p className="text-lg text-green-400 font-semibold">{selectedPlayer.role}</p>
                </div>
              )}
            </div>

            <button
              onClick={closeModal}
              className="w-full bg-red-600 hover:bg-red-500 transition rounded-lg py-3 text-lg font-semibold"
            >
              Chiudi e passa il dispositivo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
