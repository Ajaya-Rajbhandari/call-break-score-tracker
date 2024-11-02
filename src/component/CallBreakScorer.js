import React, { useState } from "react";
import { Trophy, RotateCcw } from "lucide-react";
import styles from "../styles/CallBreakScorer.module.css";

const CallBreakScorer = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [editingNames, setEditingNames] = useState(true);
  const [players, setPlayers] = useState([
    { name: "Player 1", rounds: [], total: 0 },
    { name: "Player 2", rounds: [], total: 0 },
    { name: "Player 3", rounds: [], total: 0 },
    { name: "Player 4", rounds: [], total: 0 },
  ]);

  const handleNameEdit = (playerIndex, newName) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].name = newName;
    setPlayers(updatedPlayers);
  };

  const startGame = () => {
    setEditingNames(false);
  };

  const handleCall = (playerIndex, call) => {
    const updatedPlayers = [...players];
    if (!updatedPlayers[playerIndex].rounds[currentRound - 1]) {
      updatedPlayers[playerIndex].rounds[currentRound - 1] = {};
    }
    updatedPlayers[playerIndex].rounds[currentRound - 1].call =
      parseInt(call) || 0;
    setPlayers(updatedPlayers);
  };

  const handleActual = (playerIndex, actual) => {
    const updatedPlayers = [...players];
    if (!updatedPlayers[playerIndex].rounds[currentRound - 1]) {
      updatedPlayers[playerIndex].rounds[currentRound - 1] = {};
    }
    const actualPoints = parseInt(actual) || 0;
    const call = updatedPlayers[playerIndex].rounds[currentRound - 1].call || 0;

    let points = 0;
    if (actualPoints >= call) {
      points = call + (actualPoints - call) * 0.1;
    } else {
      points = -call;
    }

    updatedPlayers[playerIndex].rounds[currentRound - 1].actual = actualPoints;
    updatedPlayers[playerIndex].rounds[currentRound - 1].points = points;
    updatedPlayers[playerIndex].total = updatedPlayers[
      playerIndex
    ].rounds.reduce((sum, round) => sum + (round.points || 0), 0);
    setPlayers(updatedPlayers);
  };

  const nextRound = () => {
    if (currentRound < 5) {
      setCurrentRound(currentRound + 1);
    }
  };

  const startNewGame = () => {
    setCurrentRound(1);
    setEditingNames(true);
    setPlayers(players.map((p) => ({ ...p, rounds: [], total: 0 })));
  };

  const getWinner = () => {
    return players.reduce(
      (max, player) => (player.total > max.total ? player : max),
      players[0]
    );
  };

  const validateRound = () => {
    const currentRoundData = players.map((p) => p.rounds[currentRound - 1]);
    const allEntered = currentRoundData.every(
      (round) => round && round.call !== undefined && round.actual !== undefined
    );
    const totalActual = currentRoundData.reduce(
      (sum, round) => sum + (round?.actual || 0),
      0
    );
    return allEntered && totalActual === 13;
  };

  if (editingNames) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Enter Player Names</h2>
          </div>
          <div className={styles.playerSetup}>
            {players.map((player, index) => (
              <input
                key={index}
                value={player.name}
                onChange={(e) => handleNameEdit(index, e.target.value)}
                placeholder={`Player ${index + 1}`}
                className={styles.nameInput}
              />
            ))}
            <button
              onClick={startGame}
              className={styles.button}
              disabled={players.some((p) => !p.name.trim())}
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Call Break Score Tracker</h2>
          <div className={styles.roundInfo}>Round {currentRound} of 5</div>
        </div>

        <div className={styles.grid}>
          <div className={styles.gridHeader}>Player</div>
          <div className={styles.gridHeader}>Call</div>
          <div className={styles.gridHeader}>Actual</div>
          <div className={styles.gridHeader}>Points</div>
          <div className={styles.gridHeader}>Total</div>
        </div>

        {players.map((player, playerIndex) => (
          <div key={player.name} className={styles.grid}>
            <div className={styles.cell}>{player.name}</div>
            <input
              type="number"
              min="0"
              max="13"
              placeholder="Call"
              value={player.rounds[currentRound - 1]?.call || ""}
              onChange={(e) => handleCall(playerIndex, e.target.value)}
              className={styles.input}
            />
            <input
              type="number"
              min="0"
              max="13"
              placeholder="Actual"
              value={player.rounds[currentRound - 1]?.actual || ""}
              onChange={(e) => handleActual(playerIndex, e.target.value)}
              className={styles.input}
            />
            <div className={styles.cell}>
              {player.rounds[currentRound - 1]?.points?.toFixed(1) || 0}
            </div>
            <div className={styles.cell}>{player.total.toFixed(1)}</div>
          </div>
        ))}

        {!validateRound() && (
          <div className={styles.alert}>
            Total tricks must equal 13 and all fields must be filled before
            proceeding
          </div>
        )}

        {currentRound < 5 ? (
          <button
            onClick={nextRound}
            className={styles.button}
            disabled={!validateRound()}
          >
            Next Round
          </button>
        ) : (
          <div>
            <div className={styles.winnerCard}>
              <Trophy className={styles.winnerIcon} size={24} />
              <span>
                <strong>Winner: {getWinner().name}</strong>
              </span>
              <span>with {getWinner().total.toFixed(1)} points</span>
            </div>
            <button onClick={startNewGame} className={styles.button}>
              <RotateCcw size={16} />
              Start New Game
            </button>
          </div>
        )}
      </div>

      {currentRound > 1 && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Previous Rounds</h3>
          </div>
          <div className={styles.previousRounds}>
            <div className={styles.roundRow}>
              <div>Round</div>
              {players.map((player) => (
                <div key={player.name}>{player.name}</div>
              ))}
            </div>
            {Array.from({ length: currentRound - 1 }).map((_, index) => (
              <div key={index} className={styles.roundRow}>
                <div>{index + 1}</div>
                {players.map((player) => (
                  <div key={player.name}>
                    {player.rounds[index]?.points?.toFixed(1) || 0}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CallBreakScorer;
